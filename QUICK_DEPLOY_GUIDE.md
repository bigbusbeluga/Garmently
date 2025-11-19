# 🚀 Quick Vercel Deployment Guide

## Prerequisites
✅ Vercel account (free at vercel.com)
✅ GitHub account (you already have this)
✅ AWS S3 credentials (you already have this)

---

## Deploy via Web Interface (5 Minutes)

### BACKEND DEPLOYMENT

1. **Go to [vercel.com](https://vercel.com)** → Sign in with GitHub

2. **Click "Add New..." → "Project"**

3. **Import Repository:**
   - Select `bigbusbeluga/Garmently`
   - Click "Import"

4. **Configure Project:**
   ```
   Root Directory: backend
   Framework Preset: Other
   Build Command: (leave default)
   Output Directory: (leave default)
   ```

5. **Environment Variables** (Click "Environment Variables" tab):
   ```bash
   SECRET_KEY=django-insecure-CHANGE-THIS-TO-RANDOM-STRING
   DJANGO_SETTINGS_MODULE=garmently_backend.settings_vercel
   DEBUG=False
   AWS_ACCESS_KEY_ID=AKIAVE42IRGTY62NWQZO
   AWS_SECRET_ACCESS_KEY=your-secret-key-here
   AWS_STORAGE_BUCKET_NAME=garmently-media
   AWS_S3_REGION_NAME=us-east-1
   ```

6. **Click "Deploy"**

7. **Copy your backend URL** (e.g., `garmently-backend-abc123.vercel.app`)

---

### FRONTEND DEPLOYMENT

1. **Click "Add New..." → "Project"** (in Vercel dashboard)

2. **Import Repository Again:**
   - Select `bigbusbeluga/Garmently`
   - Click "Import"

3. **Configure Project:**
   ```
   Root Directory: frontend
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   ```

4. **Environment Variables:**
   ```bash
   REACT_APP_API_URL=https://YOUR-BACKEND-URL.vercel.app/api
   GENERATE_SOURCEMAP=false
   ```
   ⚠️ **IMPORTANT:** Replace `YOUR-BACKEND-URL` with the actual URL from backend deployment!

5. **Click "Deploy"**

6. **Your app is LIVE!** 🎉

---

## Deploy via CLI (Alternative)

### Install Vercel CLI:
```powershell
npm install -g vercel
```

### Deploy Backend:
```powershell
cd backend
vercel
# Follow prompts, set root directory to "backend"
# Add environment variables via vercel.com dashboard
```

### Deploy Frontend:
```powershell
cd ../frontend
vercel
# Follow prompts, set root directory to "frontend"
# Add REACT_APP_API_URL environment variable
```

---

## Post-Deployment Steps

### 1. Update CORS Settings
After deployment, update your backend's CORS settings:

In Vercel backend project:
- Settings → Environment Variables
- Add: `CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app`
- Redeploy

### 2. Test Your Deployment

Visit your frontend URL:
- ✅ Landing page should load
- ✅ Sign up should work
- ✅ Image uploads to S3 should work
- ✅ API calls should connect

### 3. Custom Domain (Optional)

In Vercel:
- Go to project Settings → Domains
- Add your custom domain
- Update DNS records as instructed

---

## Environment Variables Reference

### Backend (.env.vercel):
```bash
# Django Core
SECRET_KEY=generate-random-secret-key
DJANGO_SETTINGS_MODULE=garmently_backend.settings_vercel
DEBUG=False

# AWS S3 (use your actual credentials)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=garmently-media
AWS_S3_REGION_NAME=us-east-1

# Optional: Database (if using external PostgreSQL)
# DATABASE_URL=postgres://user:pass@host:port/db
```

### Frontend (.env.vercel):
```bash
# API Connection
REACT_APP_API_URL=https://your-backend.vercel.app/api

# Build Optimization
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
```

---

## Troubleshooting

### ❌ CORS Errors
**Solution:** Add frontend URL to backend's CORS_ALLOWED_ORIGINS

### ❌ Build Fails
**Solution:** Check that root directory is set correctly (backend/frontend)

### ❌ Environment Variables Not Working
**Solution:** Make sure they're set in Vercel dashboard, not just .env files

### ❌ S3 Upload Fails
**Solution:** Verify AWS credentials in backend environment variables

### ❌ 404 on API Calls
**Solution:** Check REACT_APP_API_URL includes `/api` at the end

---

## Success Checklist

- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel  
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Can access landing page
- [ ] Can sign up and login
- [ ] Can add garments
- [ ] Images upload to S3
- [ ] API endpoints responding

---

## Your Deployed URLs

After deployment, you'll have:
- **Backend API**: `https://garmently-backend-[random].vercel.app`
- **Frontend Web**: `https://garmently-[random].vercel.app`
- **Admin Panel**: `https://garmently-backend-[random].vercel.app/admin`

---

## Need Help?

Check the full deployment guide: `VERCEL_DEPLOYMENT_GUIDE.md`

Your app is production-ready with:
✅ AWS S3 file storage
✅ User authentication
✅ REST API
✅ Web interface
✅ Mobile responsive
✅ Serverless architecture

**Happy Deploying!** 🚀
