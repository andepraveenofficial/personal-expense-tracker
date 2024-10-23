import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCategories = async () => {
  // Delete all existing categories
  await prisma.category.deleteMany();

  // Categories to seed
  const categories = [
    {
      name: 'Salary',
      type: 'INCOME',
    },
    {
      name: 'Freelance',
      type: 'INCOME',
    },
    {
      name: 'Investments',
      type: 'INCOME',
    },
    {
      name: 'Food & Dining',
      type: 'EXPENSE',
    },
    {
      name: 'Transportation',
      type: 'EXPENSE',
    },
    {
      name: 'Utilities',
      type: 'EXPENSE',
    },
    {
      name: 'Entertainment',
      type: 'EXPENSE',
    },
    {
      name: 'Healthcare',
      type: 'EXPENSE',
    },
  ];

  // Create new categories
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log('Categories seeded successfully');
};
