import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seedUsers = async () => {
  // Delete all existing users
  await prisma.user.deleteMany();

  // Hash the password
  const password = await bcrypt.hash('password123', 10);

  // Users to seed
  const users = [
    {
      firstName: 'user1',
      lastName: 'one',
      email: 'manager@example.com',
      password,
    },
    {
      firstName: 'user2',
      lastName: 'two',
      email: 'admin@example.com',
      password,
    },
    {
      firstName: 'user3',
      lastName: 'three',
      email: 'user@example.com',
      password,
    },
  ];

  // Create new users
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Users seeded successfully');
};
