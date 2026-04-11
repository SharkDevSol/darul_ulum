# Test Super Admin API Data
Write-Host "Testing Super Admin Dashboard API Endpoints..." -ForegroundColor Cyan
Write-Host ""

# Test Finance
Write-Host "=== FINANCE DATA ===" -ForegroundColor Yellow
$finance = Invoke-WebRequest -Uri "https://iqras.skoolific.com/api/aggregate/finance" -Method GET -UseBasicParsing | ConvertFrom-Json
Write-Host "Summary:" -ForegroundColor Green
$finance.summary | Format-List
Write-Host "Branches:" -ForegroundColor Green
$finance.byBranch | Format-Table branch_name, total_revenue, total_pending, total_paid

Write-Host ""
Write-Host "=== ACADEMICS DATA ===" -ForegroundColor Yellow
$academics = Invoke-WebRequest -Uri "https://iqras.skoolific.com/api/aggregate/academics" -Method GET -UseBasicParsing | ConvertFrom-Json
Write-Host "Summary:" -ForegroundColor Green
$academics.summary | Format-List
Write-Host "Classes Count:" $academics.classes.Count -ForegroundColor Green
Write-Host "First 5 Classes:" -ForegroundColor Green
$academics.classes | Select-Object -First 5 | Format-Table class_name, grade, branch_name, student_count

Write-Host ""
Write-Host "=== STUDENTS DATA ===" -ForegroundColor Yellow
$students = Invoke-WebRequest -Uri "https://iqras.skoolific.com/api/aggregate/students" -Method GET -UseBasicParsing | ConvertFrom-Json
Write-Host "Total Students:" $students.Count -ForegroundColor Green
Write-Host "First 5 Students:" -ForegroundColor Green
$students | Select-Object -First 5 | Format-Table name, grade, branch_name, status
