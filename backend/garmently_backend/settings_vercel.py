"""
Vercel production settings for Garmently app.
"""

from .settings import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False') == 'True'

# Vercel provides this automatically - allow all Vercel domains
ALLOWED_HOSTS = ['.vercel.app', '.now.sh', 'localhost', '127.0.0.1']

# You can also add specific domains:
# ALLOWED_HOSTS = ['your-app.vercel.app', 'localhost']

# Remove problematic middleware for serverless
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Database - Vercel doesn't support SQLite in production, so we'll use Railway/Supabase
# For now, keeping SQLite for simplicity, but you should use PostgreSQL for production
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/tmp/db.sqlite3',  # Use /tmp for serverless
    }
}

# If you want to use PostgreSQL (recommended):
if os.getenv('DATABASE_URL'):
    import dj_database_url
    DATABASES = {
        'default': dj_database_url.config(
            default=os.getenv('DATABASE_URL'),
            conn_max_age=600
        )
    }

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://garmently.vercel.app",  # Your actual frontend URL
    "https://garmently-frontend.vercel.app",
    "http://localhost:3000",  # For local development
]

# Allow all origins temporarily for testing (REMOVE IN PRODUCTION!)
CORS_ALLOW_ALL_ORIGINS = True

# Static files configuration for Vercel
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Since we're using S3 for media, we don't need local static files in production
# Vercel will handle static files automatically

# Media files are already configured via S3 in base settings

# Use environment variables
SECRET_KEY = os.getenv('SECRET_KEY', 'your-production-secret-key-here')

# AWS S3 settings (already configured in base settings)
# Make sure these environment variables are set in Vercel:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY  
# - AWS_STORAGE_BUCKET_NAME
# - AWS_S3_REGION_NAME