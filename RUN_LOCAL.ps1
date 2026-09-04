$ErrorActionPreference = "Stop"
Write-Host "=== Smile Care Website V1 ===" -ForegroundColor Cyan
Write-Host "Installing pinned dependencies..." -ForegroundColor DarkCyan
npm install
Write-Host "Starting local development server..." -ForegroundColor Green
npm run dev
