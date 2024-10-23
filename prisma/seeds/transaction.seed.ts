import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedTransactions = async () => {
  // Delete all existing transactions
  await prisma.transaction.deleteMany();

  // Get seeded users and categories
  const users = await prisma.user.findMany();
  const incomeCategories = await prisma.category.findMany({
    where: { type: 'INCOME' },
  });
  const expenseCategories = await prisma.category.findMany({
    where: { type: 'EXPENSE' },
  });

  // Generate some sample transactions for each user
  for (const user of users) {
    // Create income transactions
    for (const category of incomeCategories) {
      await prisma.transaction.create({
        data: {
          type: 'INCOME',
          amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000-6000
          description: `${category.name} income`,
          userId: user.id,
          categoryId: category.id,
          date: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
          ), // Random date within last 30 days
        },
      });
    }

    // Create expense transactions
    for (const category of expenseCategories) {
      await prisma.transaction.create({
        data: {
          type: 'EXPENSE',
          amount: Math.floor(Math.random() * 500) + 100, // Random amount between 100-600
          description: `${category.name} expense`,
          userId: user.id,
          categoryId: category.id,
          date: new Date(
            Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
          ), // Random date within last 30 days
        },
      });
    }
  }

  console.log('Transactions seeded successfully');
};
