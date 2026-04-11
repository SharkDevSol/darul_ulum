# Deploy super admin dashboard updates to VPS
Write-Host "Deploying super admin dashboard updates..." -ForegroundColor Cyan

ssh root@76.13.48.245 @"
cd /var/www/iqras.skoolific.com
echo 'Pulling latest changes from GitHub...'
git pull origin main
echo 'Installing backend dependencies...'
cd backend
npm install
echo 'Restarting backend...'
pm2 restart iqras-backend
echo 'Building frontend...'
cd ../frontend
npm install
npm run build
echo 'Deployment complete!'
"@

Write-Host "Super admin dashboard updated successfully!" -ForegroundColor Green
Write-Host "Visit https://iqras.skoolific.com to see the changes" -ForegroundColor Cyan
