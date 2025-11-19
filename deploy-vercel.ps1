# Quick deploy script for Vercel
# Run this after installing Vercel CLI: npm install -g vercel

Write-Host "🚀 Deploying Garmently to Vercel" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Install Vercel CLI (if not installed)" -ForegroundColor Yellow
Write-Host "Run: npm install -g vercel" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 2: Deploy Backend" -ForegroundColor Yellow
Write-Host "cd backend" -ForegroundColor Cyan
Write-Host "vercel --prod" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 3: Set Backend Environment Variables" -ForegroundColor Yellow
Write-Host "Go to vercel.com → Project Settings → Environment Variables" -ForegroundColor Cyan
Write-Host "Add: SECRET_KEY, AWS credentials, etc." -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 4: Deploy Frontend" -ForegroundColor Yellow
Write-Host "cd ../frontend" -ForegroundColor Cyan
Write-Host "vercel --prod" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 5: Set Frontend Environment Variable" -ForegroundColor Yellow
Write-Host "REACT_APP_API_URL=https://your-backend-url.vercel.app/api" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "Check your Vercel dashboard for live URLs" -ForegroundColor White
