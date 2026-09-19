import sys
from pathlib import Path

# Ensure root and backend directory are in sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from backend.main import app

__all__ = ["app"]
