import sys
from pathlib import Path

# Add the 'src' directory to sys.path to allow imports from there
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))
