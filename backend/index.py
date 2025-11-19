from garmently_backend.wsgi import application

# Vercel serverless function handler
def handler(request, context):
    return application(request, context)

# Also expose as app for compatibility
app = application
