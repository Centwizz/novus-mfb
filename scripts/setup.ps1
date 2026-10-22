# Novus MFB — Developer quickstart (Windows / PowerShell)
#
# Runs the one-time local setup: install deps, create env files, start services,
# generate the Prisma client, migrate and seed.
#
# Usage:  powershell -ExecutionPolicy Bypass -File .\scripts\setup.ps1

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

Write-Host "==> Installing dependencies" -ForegroundColor Cyan
npm install

Write-Host "==> Creating environment files (skipping if present)" -ForegroundColor Cyan
if (-not (Test-Path 'apps/api/.env')) { Copy-Item '.env.example' 'apps/api/.env' }
if (-not (Test-Path 'apps/web/.env.local')) { Copy-Item '.env.example' 'apps/web/.env.local' }

Write-Host "==> Starting PostgreSQL and Redis (Docker)" -ForegroundColor Cyan
docker compose up -d

Write-Host "==> Waiting for PostgreSQL to accept connections" -ForegroundColor Cyan
$ready = $false
for ($i = 0; $i -lt 30; $i++) {
  $status = (docker inspect --format '{{.State.Health.Status}}' novus-postgres 2>$null)
  if ($status -eq 'healthy') { $ready = $true; break }
  Start-Sleep -Seconds 2
}
if (-not $ready) { Write-Warning 'PostgreSQL did not report healthy in time. Check: docker compose logs postgres' }

Write-Host "==> Generating Prisma client and applying migrations" -ForegroundColor Cyan
npm run prisma:generate --workspace=apps/api
npm run prisma:migrate --workspace=apps/api

Write-Host "==> Seeding development data" -ForegroundColor Cyan
npm run db:seed

Write-Host ""
Write-Host "Setup complete. Next steps:" -ForegroundColor Green
Write-Host "  1. Set AUTH_SECRET in apps/api/.env (see README for a generator command)."
Write-Host "  2. Run 'npm run dev' and open http://localhost:3000"
