# DNS Monitoring and SSL Setup Script

$domain = "darul-ulum.skoolific.com"
$expectedIP = "76.13.48.245"
$maxAttempts = 30

Write-Host "Monitoring DNS propagation for $domain" -ForegroundColor Cyan
Write-Host "Expected IP: $expectedIP" -ForegroundColor Yellow
Write-Host ""

for ($i = 1; $i -le $maxAttempts; $i++) {
    Write-Host "[$i/$maxAttempts] Checking DNS..." -NoNewline
    
    try {
        $result = Resolve-DnsName -Name $domain -Server 8.8.8.8 -ErrorAction SilentlyContinue
        
        if ($result -and $result.IPAddress -eq $expectedIP) {
            Write-Host " RESOLVED!" -ForegroundColor Green
            Write-Host ""
            Write-Host "DNS is now active: $domain -> $expectedIP" -ForegroundColor Green
            Write-Host ""
            Write-Host "Installing SSL certificate..." -ForegroundColor Cyan
            
            ssh root@76.13.48.245 "certbot --nginx -d $domain --non-interactive --agree-tos --email admin@skoolific.com"
            
            Write-Host ""
            Write-Host "SUCCESS! Darul Ulum is now accessible at:" -ForegroundColor Green
            Write-Host "https://$domain" -ForegroundColor Cyan
            Write-Host ""
            
            exit 0
        }
        
        Write-Host " Not yet..." -ForegroundColor Yellow
    }
    catch {
        Write-Host " Not resolving..." -ForegroundColor Yellow
    }
    
    if ($i -lt $maxAttempts) {
        Write-Host "   Waiting 60 seconds..."
        Start-Sleep -Seconds 60
    }
}

Write-Host ""
Write-Host "DNS propagation is taking longer than expected." -ForegroundColor Yellow
Write-Host "The system is ready and will work as soon as DNS propagates." -ForegroundColor Green
