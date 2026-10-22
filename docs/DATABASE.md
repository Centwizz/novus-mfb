# DATABASE - Novus MFB

PostgreSQL database managed with Prisma. Schema: `apps/api/prisma/schema.prisma`.

## Identifier strategy
All primary keys are UUIDs (`@db.Uuid`). Timestamps are stored in UTC (`DateTime`) and
presented in the user's timezone by the UI.

## Entities

### Identity & access
- **User** — account record for customers, support agents and admins. `role` enum gates access.
  `passwordHash` holds an Argon2 hash (never plaintext). Soft-deletable via `deletedAt`.
- **CustomerProfile** — optional customer-specific details (`preferredLanguage`, address, etc.).
  `bvn` is present in the schema but must only be populated when legally approved; the seed never
  inserts real values.
- **Session** — server-side sessions. Only a **hash** of the session token is stored
  (`tokenHash`), never the raw token.
- **VerificationToken** / **PasswordResetToken** — short-lived, single-use, hashed tokens.

### Support
- **Ticket** — customer issue with `reference`, `status`, `priority`, optional `assigneeId`.
- **TicketMessage** — messages on a ticket; `isInternal` separates agent-only notes from
  customer-visible replies (enforced in the service layer).
- **TicketEvent** — immutable audit trail of status/assignment/priority changes.

### Nova (AI assistant)
- **Conversation** — a chat session; may be anonymous (`customerId` nullable) or attached to a
  user. `status` tracks escalation.
- **ConversationMessage** — individual messages with `sender` (CUSTOMER/NOVA/AGENT/SYSTEM).
- **ChatbotFeedback** — rating + optional comment.
- **KnowledgeArticle** / **KnowledgeArticleVersion** — versioned approved knowledge base.

### Platform
- **Notification** — outbound email/SMS/in-app notifications with delivery status.
- **AuditEvent** — append-only record of important actions (actor, action, entity, metadata).

## Constraints & indexes
- Unique: `User.email`, `User.phone`, `Session.tokenHash`, `Ticket.reference`,
  `KnowledgeArticle.slug`, `(KnowledgeArticleVersion.articleId, version)`.
- Foreign keys use `onDelete` policies: `Cascade` for owned children, `Restrict` to protect
  tickets/audit rows, `SetNull` for optional references.
- Indexes on all foreign keys plus hot filter columns (`status`, `createdAt`, `role`).

## Migrations
- Development: `npm run prisma:migrate --workspace=apps/api`
- Production: `npm run prisma:deploy --workspace=apps/api`

## Seeding
`npm run db:seed` inserts demo users and requires `NODE_ENV !== production`. Demo passwords are
generated at runtime (or supplied via `SEED_DEMO_PASSWORD`) and are never committed.

## Retention (to be finalised)
Conversation and audit retention policies will be documented here once confirmed by Novus MFB.
