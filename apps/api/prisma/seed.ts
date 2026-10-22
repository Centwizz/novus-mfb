import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

/**
 * Development seed script.
 *
 * Creates clearly-labelled demo accounts. It NEVER inserts real customer data and
 * does not hard-code a universal production password: the demo password comes from
 * SEED_DEMO_PASSWORD or is randomly generated and printed once.
 */
const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to run the development seed against a production database.');
  }

  const demoPassword =
    process.env.SEED_DEMO_PASSWORD ??
    `Demo-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
  const passwordHash = await argon2.hash(demoPassword);

  const admin = await upsertUser('admin@novusmfb.test', 'Admin', 'Demo', Role.ADMIN, passwordHash);
  const agent = await upsertUser('agent@novusmfb.test', 'Chidi', 'Agent', Role.SUPPORT_AGENT, passwordHash);
  const customer = await upsertUser(
    'customer@novusmfb.test',
    'Ada',
    'Customer',
    Role.CUSTOMER,
    passwordHash,
  );

  await prisma.customerProfile.upsert({
    where: { userId: customer.id },
    update: {},
    create: { userId: customer.id, preferredLanguage: 'en' },
  });

  console.log('\nSeeded demo accounts (development only):');
  console.table([
    { role: 'ADMIN', email: admin.email, password: demoPassword },
    { role: 'SUPPORT_AGENT', email: agent.email, password: demoPassword },
    { role: 'CUSTOMER', email: customer.email, password: demoPassword },
  ]);
  console.log('\nDevelopment-only credentials. Do not reuse in any real environment.\n');
}

function upsertUser(
  email: string,
  firstName: string,
  lastName: string,
  role: Role,
  passwordHash: string,
) {
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      firstName,
      lastName,
      role,
      passwordHash,
      emailVerifiedAt: new Date(),
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
