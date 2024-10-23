import { PrismaClient } from '@prisma/client';
import { seedUsers } from './user.seed';
import { seedCategories } from './category.seed';
import { seedTransactions } from './transaction.seed';

const prisma = new PrismaClient();

const main = async () => {
  try {
    await seedUsers();
    await seedCategories();
    await seedTransactions();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    console.log('Seeding completed!');
    process.exit(0);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
