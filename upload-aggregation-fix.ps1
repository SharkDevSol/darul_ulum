# Upload updated aggregation routes to iqrab3 backend
Write-Host "Uploading updated aggregationRoutes.js to VPS..." -ForegroundColor Cyan

# Upload the file
scp aggregationRoutes.js root@76.13.48.245:/var/www/skoolific/iqrab3/backend/routes/aggregationRoutes.js

if ($LASTEXITCODE -eq 0) {
    Write-Host "File uploaded successfully" -ForegroundColor Green
    
    # Restart the backend
    Write-Host "Restarting iqrab3 backend..." -ForegroundColor Cyan
    ssh root@76.13.48.245 "pm2 restart skoolific-backend"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backend restarted successfully" -ForegroundColor Green
        Write-Host "Changes deployed! The dashboard should now show branch and grade columns." -ForegroundColor Green
    }
    else {
        Write-Host "Failed to restart backend" -ForegroundColor Red
    }
}
else {
    Write-Host "Failed to upload file" -ForegroundColor Red
}
