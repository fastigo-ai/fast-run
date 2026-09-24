import asyncio
from datetime import datetime, timezone
import re
import uuid
import sys
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient

# Add project root and backend dir to sys.path for direct execution
_current_dir = Path(__file__).resolve().parent
_root_dir = _current_dir.parent
if str(_root_dir) not in sys.path:
    sys.path.insert(0, str(_root_dir))
if str(_current_dir) not in sys.path:
    sys.path.insert(0, str(_current_dir))

# Configure public DNS resolvers to prevent Windows SRV record lookup timeouts
try:
    import dns.resolver
    resolver = dns.resolver.Resolver(configure=True)
    resolver.nameservers = ['8.8.8.8', '1.1.1.1', '8.8.4.4']
    dns.resolver.default_resolver = resolver
except Exception:
    pass

try:
    from backend.config import settings
    from backend.auth import get_password_hash
    from backend.models import JobStatus
except ImportError:
    from config import settings
    from auth import get_password_hash
    from models import JobStatus

INITIAL_JOBS = [
    {
        "title": "AI Developer Intern",
        "department": "Engineering & Research",
        "location": "Remote / New Delhi",
        "job_type": "Internship (3-6 Months)",
        "experience": "Freshers / Students",
        "salary": "₹25,000 - ₹40,000 / month",
        "description": "Dive into the deep end of Artificial Intelligence. You will be working shoulder-to-shoulder with our senior architects to train models, build AI Agents, and deploy LLM applications for real-world enterprise use cases.",
        "responsibilities": [
            "Assist in developing autonomous AI agents and fine-tuning open-source LLMs.",
            "Build robust API integrations connecting LLMs to external enterprise data pipelines.",
            "Write clean, documented Python code and participate in sprint planning and code reviews.",
            "Benchmark and optimize model response latency and accuracy."
        ],
        "requirements": [
            "Strong foundational knowledge of Python and Machine Learning concepts.",
            "Experience (academic or personal projects) with PyTorch, LangChain, or TensorFlow.",
            "Familiarity with NLP, LLMs (OpenAI, Anthropic APIs), and Vector Databases (Pinecone/Chroma).",
            "A hungry, problem-solving mindset and willingness to learn extremely fast."
        ],
        "skills": ["Python", "PyTorch", "LangChain", "LLMs", "FastAPI", "Vector DBs"],
        "status": JobStatus.PUBLISHED.value
    },
    {
        "title": "SEO Marketing Specialist",
        "department": "Marketing & Growth",
        "location": "Remote",
        "job_type": "Full-time",
        "experience": "2+ years",
        "salary": "₹6,00,000 - ₹9,00,000 / annum",
        "description": "Drive the organic growth engine of Fastigo. You will be responsible for architecting and executing advanced SEO strategies, content architectures, and technical site audits to dominate search rankings in the highly competitive B2B tech space.",
        "responsibilities": [
            "Execute end-to-end technical SEO audits, core web vitals optimization, and structured data.",
            "Perform comprehensive keyword research and content gap analysis for enterprise AI keywords.",
            "Manage high-authority backlink outreach and digital PR campaigns.",
            "Track ranking movements, organic traffic growth, and conversion funnels in Google Analytics & Search Console."
        ],
        "requirements": [
            "2+ years of hardcore SEO experience, preferably in B2B Tech, SaaS, or IT consulting.",
            "Mastery of technical SEO, schema markup, and site architecture optimization.",
            "Experience with tools like Ahrefs, SEMrush, Screaming Frog, and Google Search Console.",
            "Data-driven approach to content mapping and keyword strategy."
        ],
        "skills": ["Technical SEO", "Ahrefs", "Google Search Console", "Content Strategy", "SaaS Marketing"],
        "status": JobStatus.PUBLISHED.value
    },
    {
        "title": "Business Dev Manager (BDM) - Pre-Sales",
        "department": "Sales & Strategy",
        "location": "New Delhi / Hybrid",
        "job_type": "Full-time",
        "experience": "1-3 years",
        "salary": "₹8,00,000 - ₹14,00,000 + Incentives",
        "description": "We are seeking a motivated and results-driven Business Development Manager to join our growing technology team. This role is ideal for someone passionate about driving growth, building strategic client relationships, and expanding Fastigo's presence in the global software industry.",
        "responsibilities": [
            "Identify and qualify high-value business leads across North America, Europe, and India.",
            "Conduct discovery calls, understand client technical bottlenecks, and present Fastigo solution capabilities.",
            "Collaborate closely with solutions engineering to craft technical proposals and Statements of Work (SOW).",
            "Nurture executive-level relationships across target client accounts."
        ],
        "requirements": [
            "1-3 years of experience in business development, sales, or pre-sales in technology/software consulting.",
            "Bachelor's degree in Business, Marketing, Computer Science, or related field.",
            "Proven track record of meeting or exceeding pipeline generation and revenue targets.",
            "Experience with CRM software (Salesforce, HubSpot, Zoho, or similar)."
        ],
        "skills": ["B2B Tech Sales", "Pre-Sales", "Lead Generation", "Client Discovery", "HubSpot CRM"],
        "status": JobStatus.PUBLISHED.value
    },
    {
        "title": "IT Sales Executive",
        "department": "Sales",
        "location": "Remote / New Delhi",
        "job_type": "Full-time",
        "experience": "2+ years",
        "salary": "₹5,00,000 - ₹8,50,000 + Commission",
        "description": "Fuel our global expansion. You will be responsible for full-cycle B2B sales—prospecting, pitching, and closing deals for our core IT services (Custom AI Development, Cloud migration, Cybersecurity, and App Modernization). We need a relentless closer who understands technology services.",
        "responsibilities": [
            "Lead full-cycle outbound prospecting through cold outreach, LinkedIn, and industry networks.",
            "Conduct structured pitch presentations demonstrating Fastigo's ROI and technological superiority.",
            "Negotiate commercial contracts, pricing structures, and SLAs with C-level executives.",
            "Achieve quarterly and annual revenue targets."
        ],
        "requirements": [
            "2+ years of direct B2B tech/IT service selling experience.",
            "Proven ability to build a robust pipeline via outbound prospecting.",
            "Strong negotiation skills and ability to manage complex consultative sales cycles.",
            "Hunger for immense uncapped commission potential and career growth."
        ],
        "skills": ["Outbound Sales", "IT Consulting Sales", "Contract Negotiation", "LinkedIn Sales Navigator"],
        "status": JobStatus.PUBLISHED.value
    },
    {
        "title": "Senior Cloud & DevOps Architect",
        "department": "Cloud & Infrastructure",
        "location": "Remote / Hybrid",
        "job_type": "Full-time",
        "experience": "4-7 years",
        "salary": "₹16,00,000 - ₹24,00,000 / annum",
        "description": "Architect resilient, auto-scaling multi-cloud architectures for mission-critical enterprise systems. You will lead cloud migrations, Kubernetes orchestration, CI/CD automation, and infrastructure-as-code deployments.",
        "responsibilities": [
            "Design and implement AWS/Azure cloud architectures prioritizing high availability, security, and cost efficiency.",
            "Build automated CI/CD pipelines using GitHub Actions, Docker, and Kubernetes.",
            "Implement Infrastructure-as-Code using Terraform and Ansible.",
            "Mentor junior DevOps engineers and conduct architecture design reviews."
        ],
        "requirements": [
            "4+ years of hands-on experience in AWS/Azure cloud environments with relevant certifications (AWS Solutions Architect / Azure Solutions Architect).",
            "Deep expertise in Kubernetes, Docker, Terraform, and Linux internals.",
            "Proven track record of designing high-scale, zero-downtime systems.",
            "Solid grasp of cloud security, SOC2 compliance, and observability (Prometheus/Grafana)."
        ],
        "skills": ["AWS", "Azure", "Kubernetes", "Terraform", "Docker", "CI/CD", "Prometheus"],
        "status": JobStatus.PUBLISHED.value
    }
]

def generate_slug(title: str) -> str:
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', title.lower()).strip()
    slug = re.sub(r'[\s_-]+', '-', slug)
    return f"{slug}-{uuid.uuid4().hex[:6]}"

async def init_database(existing_db=None):
    should_close = False
    client = None
    if existing_db is not None:
        db = existing_db
    else:
        print(f"Connecting to MongoDB: {settings.MONGO_URI[:35]}..., DB: {settings.DB_NAME}")
        try:
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

            client = AsyncIOMotorClient(settings.MONGO_URI, **motor_kwargs)
            await asyncio.wait_for(client.admin.command('ping'), timeout=5.0)
            db = client[settings.DB_NAME]
            should_close = True
        except Exception as e:
            print(f"[ERROR] Could not connect to MongoDB Atlas ({settings.MONGO_URI[:35]}...): {e}")
            return

    # 1. Initialize Admin Account
    try:
        existing_admin = await db.admins.find_one({"email": settings.DEFAULT_ADMIN_EMAIL.lower()})
        if not existing_admin:
            hashed_pwd = get_password_hash(settings.DEFAULT_ADMIN_PASSWORD)
            admin_doc = {
                "email": settings.DEFAULT_ADMIN_EMAIL.lower(),
                "hashed_password": hashed_pwd,
                "name": settings.DEFAULT_ADMIN_NAME,
                "role": "admin",
                "created_at": datetime.now(timezone.utc)
            }
            await db.admins.insert_one(admin_doc)
            print(f"[OK] Created default admin account: {settings.DEFAULT_ADMIN_EMAIL} / {settings.DEFAULT_ADMIN_PASSWORD}")
        else:
            print(f"[INFO] Admin account already verified: {settings.DEFAULT_ADMIN_EMAIL}")
    except Exception as e:
        print(f"[WARN] Error verifying admin account: {e}")

    # 2. Seed Jobs if empty
    try:
        jobs_count = await db.jobs.count_documents({})
        if jobs_count == 0:
            now = datetime.now(timezone.utc)
            for job_data in INITIAL_JOBS:
                job_copy = dict(job_data)
                job_copy["slug"] = generate_slug(job_copy["title"])
                job_copy["created_at"] = now
                job_copy["updated_at"] = now
                job_copy["views_count"] = 12
                job_copy["applications_count"] = 0
                job_copy["created_by"] = settings.DEFAULT_ADMIN_EMAIL
                await db.jobs.insert_one(job_copy)
            print(f"[OK] Seeded {len(INITIAL_JOBS)} initial Fastigo jobs into MongoDB.")
        else:
            print(f"[INFO] Jobs collection has {jobs_count} listings.")
    except Exception as e:
        print(f"[WARN] Error seeding jobs: {e}")

    if should_close:
        client.close()
        print("Database initialization complete.")

if __name__ == "__main__":
    asyncio.run(init_database())
