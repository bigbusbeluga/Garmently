import os
import sys

# Add the project directory to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'garmently_backend.settings_vercel')

# Import Django application
from garmently_backend.wsgi import application

# Vercel serverless function handler
app = application
