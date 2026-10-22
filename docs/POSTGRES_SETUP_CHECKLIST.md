# PostgreSQL Setup — Deferred Checklist

**Status:** Deferred by owner decision on 2026-10-22.

The backend architecture (PostgreSQL + Prisma) is **kept intact**. Nothing has been replaced with
localStorage or mock persistence. Database-backed features are simply *not yet exercised
end-to-end* on this machine because no PostgreSQL server is reachable.

Use this checklist when you are ready to resume database testing. Work top to bottom.

---

## Step 1 — Install PostgreSQL

Pick **one** of these. Option A is recommended for this project (it also gives you Redis).

### Option A: Docker Desktop (closest to production)

1. Download Docker Desktop for Windows: <https://www.docker.com/products/docker-desktop/>
2. Install it, reboot if asked, and open it once so the engine starts.
3. Confirm it works:
   ```powershell
   docker --version
   docker ps
   ```
4. Start the project's database and cache:
   ```powershell
   cd C:\Novusweb
   npm run docker:up
   ```
   This starts PostgreSQL on port **5432** and Redis on **6379**, and creates both the
   `novus_dev` and `novus_test` databases (see `docker-compose.yml` and
   `infrastructure/docker/init-test-db.sql`).

### Option B: PostgreSQL for Windows (no virtualisation)

1. Install PostgreSQL 16 (EDB installer or `winget install PostgreSQL.PostgreSQL.16`).
2. During install, set a password for the `postgres` superuser and keep the default port 5432.
3. Create the databases and role (open **SQL Shell (psql)** from the Start menu):
   ```sql
   CREATE ROLE novus WITH LOGIN PASSWORD 'novus_dev_password';
   CREATE DATABASE novus_dev OWNER novus;
   CREATE DATABASE novus_test OWNER novus;
   GRANT ALL PRIVILEGES ON DATABASE novus_dev TO novus;
   GRANT ALL PRIVILEGES ON DATABASE novus_test TO novus;
   ```
4. Redis is optional for now; skip it until a feature actually needs caching or queues.

---

## Step 2 — Confirm the connection string

Open `apps/api/.env` and check:

```
DATABASE_URL=postgresql://novus:novus_dev_password@localhost:5432/novus_dev?schema=public
```

If you used a different user, password or database name, update this line to match.
This file is gitignored — it is never committed.

---

## Step 3 — Apply the schema and seed data

From `C:\Novusweb`:

```powershell
npm run prisma:generate --workspace=apps/api
npm run prisma:migrate  --workspace=apps/api
npm run db:seed
```

- `prisma:generate` builds the typed client.
- `prisma:migrate` applies `apps/api/prisma/migrations/20261022130000_init/migration.sql`.
- `db:seed` inserts the three development-only demo accounts (admin, support agent, customer).

> **Reminder:** the seeded credentials are for local development only and must never be used in a
> real or shared environment.

---

## Step 4 — Verify the database is actually connected

```powershell
npm run dev:api
```

Then, in another terminal:

```powershell
Invoke-WebRequest http://localhost:4000/api/v1/health -UseBasicParsing | Select-Object -ExpandProperty Content
```

Expected: `"database":"up"` in the JSON (currently it reports `"down"`).

---

## Step 5 — Resume the blocked integration tests

Once the health check reports `database: up`, the following can be run and must be reported
honestly as **now passing** (they are currently **BLOCKED**, not passing):

| Test | Command |
| --- | --- |
| Chatbot end-to-end (persist + reply) | `npm run test:e2e --workspace=apps/api` (added in Phase 6) |
| Auth flows (register / login / verify / reset) | added in Phase 4 |
| Support tickets & conversations | added in Phase 7 |
| Admin dashboard data | added in Phase 8 |
| Full public-site E2E | `npm run test:e2e --workspace=apps/web` |

Also remember: Playwright E2E for the public site needs **both** `npm run dev:web` and
`npm run dev:api` running, plus the database.

---

## Current state (what is verified vs blocked)

**Verified without a database (Phase 1):**
- All typechecks pass (API, web, both shared packages).
- All lints pass (0 errors, 0 warnings).
- API unit tests pass (8/8).
- API builds and boots; `GET /api/v1/health/live` → 200; `GET /api/docs` → 200.
- `POST /api/v1/contact` → 202 valid, 400 invalid (no database needed).
- Web app builds and prerenders all 25 routes.

**Blocked until PostgreSQL exists:**
- Migrations, seed data, chatbot persistence, auth, tickets, admin data, and the full E2E suite.

See `docs/PHASE_1_VERIFICATION.md` for the full evidence log.
