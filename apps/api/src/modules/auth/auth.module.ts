import { Module } from '@nestjs/common';

/**
 * Placeholder AuthModule for the Phase 1 foundation.
 *
 * Full registration, login, session management and RBAC land in Phase 4. This
 * module exists now so the application graph is stable and can be extended without
 * restructuring AppModule later.
 */
@Module({})
export class AuthModule {}
