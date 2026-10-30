# Troubleshooting — Novus MFB

## Setup

**`Invalid environment configuration: AUTH_SECRET must be at least 32 characters`**
Set a longer `AUTH_SECRET` in `apps/api/.env`:
```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

**`Can't reach database server at localhost:5432`**
1. Ensure Docker Desktop is running.
2. `docker compose up -d`
3. Check: `docker ps` → `novus-postgres` should be `healthy`.
4. Confirm `DATABASE_URL` in `apps/api/.env` matches `docker-compose.yml`.

**`npm install` is slow or hangs on Windows**
Native modules (e.g. `argon2`) compile on first install. Ensure Node 20 LTS and the
"Desktop development with C++" workload of Visual Studio Build Tools are available, or retry
`npm install` (already-downloaded packages are cached).

## Running

**Port already in use**
- Web (3000): another dev server is running — stop it, or change the `-p` flag in `dev:web`.
- API (4000): stop the other process or set `API_PORT` in `apps/api/.env`.

**Nova replies say "Demo mode"**
Expected when `AI_PROVIDER_API_KEY` is empty. This is deliberate: the app never pretends a live
model is connected. Set a key to enable live responses.

For OpenRouter, set all three values in `apps/api/.env` and restart the API:

```dotenv
AI_PROVIDER_BASE_URL=https://openrouter.ai/api/v1
AI_PROVIDER_MODEL=deepseek/deepseek-chat-v3-0324
AI_PROVIDER_API_KEY=<your key>
```

If the model name is wrong or the key is rejected, the API logs the provider error and Nova
falls back to demo mode instead of failing the request.

**CORS error in the browser console**
Add your web origin to `ALLOWED_ORIGINS` in `apps/api/.env` (comma-separated).

**Prisma client errors after schema changes**
```powershell
npm run prisma:generate --workspace=apps/api
```

## Tests / builds

**TypeScript errors after pulling changes**
Run `npm install` (dependencies may have changed), then `npm run typecheck`.

**Playwright browser missing**
```powershell
npx playwright install chromium
```

## Getting help
Include the full error, the command you ran and the relevant request ID (`x-request-id` response
header) when reporting an issue.
