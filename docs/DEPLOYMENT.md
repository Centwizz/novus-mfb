# Deployment — Novus MFB

> **Not yet deployed.** This guide describes the intended production setup. No paid service is
> purchased and nothing is published without the owner's explicit approval.

## Recommended architecture
The platform needs a running server (NestJS API + PostgreSQL + optional Redis). It must **not**
be deployed as a purely static site.

| Component | Suggested option | Notes |
| --- | --- | --- |
| Web (Next.js) | Vercel, or a Node host (Render/Railway/Fly.io) | Streaming/SSR support required |
| API (NestJS) | Render / Railway / Fly.io / a VPS | Long-running process |
| Database | Managed PostgreSQL (Neon, Supabase, RDS) | Backups required |
| Redis (optional) | Managed Redis | Rate limiting / queues |
| Object storage | S3-compatible (if uploads needed) | Private buckets |

## Production environment variables
Set these on the host (exact names as implemented):

- `NODE_ENV=production`
- `DATABASE_URL` — production PostgreSQL connection string
- `AUTH_SECRET` — long random secret (≥ 32 chars)
- `SESSION_TTL_HOURS`
- `APP_URL`, `NEXT_PUBLIC_API_URL`, `ALLOWED_ORIGINS`
- `AI_PROVIDER_API_KEY`, `AI_PROVIDER_MODEL`
- `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM`
- `SMS_PROVIDER_API_KEY` (if used)
- `REDIS_URL` (if used)

`NEXT_PUBLIC_*` values are bundled into the browser — **never** put a secret there.

## Deployment steps
1. Provision PostgreSQL and create the production database.
2. Set all environment variables on the web and API hosts.
3. Deploy the API and run migrations: `npm run prisma:deploy --workspace=apps/api`.
4. Deploy the web app pointing `NEXT_PUBLIC_API_URL` at the API's public URL.
5. Configure the domain and DNS; enable HTTPS (managed by the host).
6. Verify health: `GET https://<api>/api/v1/health` returns `status: "ok"`.
7. Run post-deploy smoke tests (E2E against `E2E_BASE_URL`).

## Secret hygiene checklist (run before launch)
- [ ] No secret keys in `NEXT_PUBLIC_*` variables
- [ ] `.env*` files are gitignored and not committed
- [ ] `AUTH_SECRET` is unique and strong
- [ ] Database credentials are production-specific
- [ ] `AI_PROVIDER_API_KEY` set only server-side

## Backups & recovery
- Enable automated daily database backups with point-in-time recovery where available.
- Document and test a restore procedure before go-live.
- Record rollback steps per host (previous deployment / previous migration).

## Incident response (outline)
1. Contain (rotate credentials, disable affected route).
2. Assess scope and impact.
3. Notify the owner; follow any regulatory obligations.
4. Remediate and add a regression test.
5. Post-incident review and documentation update.
