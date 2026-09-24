import asyncio
import time
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from backend.config import settings

# Configure public DNS resolvers to prevent Windows SRV record lookup timeouts
try:
    import dns.resolver
    resolver = dns.resolver.Resolver(configure=True)
    resolver.nameservers = ['8.8.8.8', '1.1.1.1', '8.8.4.4']
    dns.resolver.default_resolver = resolver
except Exception:
    pass

class Database:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None
    is_connected: bool = False
    last_check: float = 0

db_instance = Database()

async def is_db_connected() -> bool:
    if not db_instance.client:
        return False
    now = time.time()
    if now - db_instance.last_check < 15:
        return db_instance.is_connected
    try:
        await asyncio.wait_for(db_instance.client.admin.command('ping'), timeout=1.0)
        db_instance.is_connected = True
    except Exception:
        db_instance.is_connected = False
    db_instance.last_check = now
    return db_instance.is_connected

async def _try_connect(uri: str, db_name: str) -> tuple[AsyncIOMotorClient, AsyncIOMotorDatabase]:
    motor_kwargs = {
        "serverSelectionTimeoutMS": 5000,
        "connectTimeoutMS": 5000,
        "socketTimeoutMS": 5000,
    }
    try:
        import certifi
        motor_kwargs["tlsCAFile"] = certifi.where()
    except Exception:
        pass

    client = AsyncIOMotorClient(uri, **motor_kwargs)
    db = client[db_name]
    await asyncio.wait_for(client.admin.command('ping'), timeout=5.0)
    return client, db

async def connect_to_mongo():
    target_uri = settings.MONGO_URI
    db_name = settings.DB_NAME
    client = None
    db = None

    try:
        print(f"Connecting to MongoDB ({target_uri[:35]}...)...")
        client, db = await _try_connect(target_uri, db_name)
        db_instance.client = client
        db_instance.db = db
        db_instance.is_connected = True
        print(f"Successfully connected to MongoDB, database: {db_name}")
    except Exception as err:
        print(f"[Error] MongoDB connection failed: {err}")
        db_instance.client = None
        db_instance.db = None
        db_instance.is_connected = False

    # 3. If connected (either primary or local fallback), configure indexes & seed
    if db_instance.is_connected and db_instance.db is not None:
        try:
            await db_instance.db.admins.create_index("email", unique=True)
            await db_instance.db.jobs.create_index("slug", unique=True)
            await db_instance.db.jobs.create_index("status")
            await db_instance.db.applications.create_index("created_at")
            await db_instance.db.applications.create_index("job_id")
            await db_instance.db.contacts.create_index("created_at")
            await db_instance.db.access_tokens.create_index("token", unique=True)
            await db_instance.db.access_tokens.create_index("email")
            await db_instance.db.access_tokens.create_index("expires_at", expireAfterSeconds=0)
            await db_instance.db.refresh_tokens.create_index("token", unique=True)
            await db_instance.db.refresh_tokens.create_index("email")
            await db_instance.db.refresh_tokens.create_index("expires_at", expireAfterSeconds=0)
        except Exception as e:
            print(f"Index creation notice: {e}")

        try:
            from backend.init_db import init_database
            await init_database(existing_db=db_instance.db)
        except Exception as e:
            print(f"Database auto-init notice: {e}")
    else:
        print("[Notice] MongoDB running in full memory/fallback mode. All data persisted in memory.")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        db_instance.client = None
        db_instance.db = None
        db_instance.is_connected = False
        print("Closed MongoDB connection.")

def get_db() -> AsyncIOMotorDatabase:
    return db_instance.db

