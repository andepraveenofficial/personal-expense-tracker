import prisma from '../../../config/prisma';
import { CreateTransactionDto, UpdateTransactionDto } from '../dtos';
import { NotFoundError } from '../../../handlers/apiCustomError.handler';

export const create = async (
  userId: string,
  transactionData: CreateTransactionDto,
) => {
  const category = await prisma.category.findUnique({
    where: { id: transactionData.categoryId },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return await prisma.transaction.create({
    data: {
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description,
      date: transactionData.date || new Date(),
      userId: userId, // Link to user
      categoryId: transactionData.categoryId, // Link to category
    },
  });
};

export const findById = async (id: string) => {
  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction) {
    throw new NotFoundError('Transaction not found');
  }
  return transaction;
};

export const update = async (id: string, updateData: UpdateTransactionDto) => {
  return await prisma.transaction.update({
    where: { id },
    data: updateData,
  });
};

export const softDelete = async (id: string) => {
  return await prisma.transaction.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
