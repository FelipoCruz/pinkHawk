import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    firstName: 'Alice',
    familyName: 'Wang',
    email: 'alice@prisma.io',
    password: '$2b$10$zeA1CJsHpKqAV1pkj86dqOL.RXrZdXSw1.Mmw6Dn//SbXwRVgtgWi', // corresponding to '1234'
    twitterInfo: '@Ally',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
