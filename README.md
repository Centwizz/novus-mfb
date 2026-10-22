# Novus MFB — Banking Website, Backend & AI Customer Service Platform

A complete web platform for **Novus MFB (Novus Microfinance Bank)**: a responsive public
website, a NestJS backend API, a PostgreSQL database, customer authentication, a support
portal, an admin dashboard, and **Nova** — an AI customer-service assistant with human-agent
escalation.

> **Project status:** under active, phased development. See `docs/PROJECT_PLAN.md` for the
> authoritative progress tracker. Placeholders are clearly labelled and no unverified
> financial, regulatory or business claims are made anywhere in the app.

---

## Repository layout

```
novus-mfb/
├── apps/
│   ├── web/              # Next.js (App Router) public website + portal UI
│   └── api/              # NestJS REST API (/api/v1)
├── packages/
│   ├── shared-types/     # Types shared between web and api
│   └── shared-validation/# Zod schemas shared between web and api
├── infrastructure/
│   └── docker/           # Docker helper files
├── docs/                 # Planning, architecture, security and testing docs
├── scripts/              # Utility scripts
├── assets/               # Owner-supplied source assets (e.g. the logo)
├── docker-compose.yml    # Local PostgreSQL + Redis
├── .env.example          # Environment variable reference
└── README.md
```

---

## Prerequisites

Install these once on your machine:

| Tool           | Version | Why                                            |
| -------------- | ------- | ---------------------------------------------- |
| Node.js        | 20 LTS  | Runs the frontend and backend                  |
| npm            | 10+     | Installs dependencies (bundled with Node)      |
| Docker Desktop | latest  | Runs PostgreSQL and Redis locally              |
| Git            | latest  | Version control                                |

Verify with:

```powershell
node --version
npm --version
docker --version
```

---

## First-time setup (Windows / PowerShell)

> Run every command from the project root (`C:\Novusweb`) unless stated otherwise.

### 1. Install dependencies

```powershell
npm install
```

**Expected:** a `node_modules` folder appears and the command finishes without errors.

### 2. Create your environment files

```powershell
Copy-Item .env.example apps\api\.env
Copy-Item .env.example apps\web\.env.local
```

Then open `apps\api\.env` and set `AUTH_SECRET` to a long random string. Generate one with:

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Leave `AI_PROVIDER_API_KEY` empty to run Nova in clearly-labelled **demo mode**.

### 3. Start the database and cache

```powershell
docker compose up -d
```

**Expected:** `novus-postgres` and `novus-redis` containers start and report healthy
(`docker ps`). This also creates a `novus_test` database for automated tests.

### 4. Apply database migrations and seed demo data

```powershell
npm run prisma:generate --workspace=apps/api
npm run prisma:migrate --workspace=apps/api
npm run db:seed
```

**Expected:** tables are created and the seed prints three demo accounts
(`admin@`, `agent@`, `customer@novusmfb.test`) with a randomly generated password. These are
**development-only** credentials.

### 5. Run the apps

Run both the frontend and backend together:

```powershell
npm run dev
```

Or separately, in two terminals:

```powershell
npm run dev:web   # http://localhost:3000
npm run dev:api   # http://localhost:4000/api/v1
```

**Expected:**
- Website: <http://localhost:3000>
- API health check: <http://localhost:4000/api/v1/health>
- API docs (Swagger): <http://localhost:4000/api/docs>

---

## Common commands

| Command                              | What it does                                  |
| ------------------------------------ | --------------------------------------------- |
| `npm run dev`                        | Start web + api together                      |
| `npm run dev:web`                    | Start only the Next.js website                |
| `npm run dev:api`                    | Start only the NestJS API                     |
| `npm run build`                      | Production build of all workspaces            |
| `npm run typecheck`                  | TypeScript checks everywhere                  |
| `npm run lint`                       | Lint everything                               |
| `npm run test`                       | Run unit/integration tests                    |
| `npm run docker:up` / `docker:down`  | Start / stop local PostgreSQL + Redis         |
| `npm run db:migrate`                 | Apply Prisma migrations                       |
| `npm run db:seed`                    | Seed development data                         |

---

## Troubleshooting

- **`AUTH_SECRET must be at least 32 characters`** — set a longer value in `apps\api\.env`.
- **`Can't reach database server`** — make sure Docker Desktop is running and `docker compose up -d` succeeded.
- **Port already in use** — stop the other process or change `API_PORT` (api) / `-p` in `dev:web`.
- **Nova replies say "Demo mode"** — expected until you set `AI_PROVIDER_API_KEY`. This is
  intentional and honest: no live model is claimed when none is configured.

---

## Documentation

- `docs/PROJECT_PLAN.md` — phased roadmap and progress
- `docs/REFERENCE_AUDIT.md` — study of the reference site
- `docs/ARCHITECTURE.md` — system architecture
- `docs/TECH_STACK.md` — technology choices
- `docs/SECURITY_PLAN.md` — security approach
- `docs/TESTING_PLAN.md` — testing strategy

---

## Branding & configuration

Brand colours are derived from the owner-supplied logo (`assets/novus‑mfb logo.png`, copied to
`apps/web/public/brand/`). All business details, contact info and product terms live in
`apps/web/src/lib/site-config.ts` and are marked `TODO(owner)` where verified information is
still required.
