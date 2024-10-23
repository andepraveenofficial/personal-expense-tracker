import { CreateTransactionDto, UpdateTransactionDto } from '../dtos';
import { transactionRepository } from '../repositories';
import {
  applyQueryOptions,
  PaginatedResponse,
} from '../../../utils/query.utils';
import prisma from '../../../config/prisma';
import { UnauthorizedError } from './../../../handlers/apiCustomError.handler';
import { TransactionModel } from '../models';
import { AuthRequest } from '../../../middlewares/auth.middleware';

// Get all transactions with pagination and user filtering
export const getAllTransactions = async (
  req: AuthRequest,
): Promise<PaginatedResponse<TransactionModel>> => {
  const paginatedTransactions = await applyQueryOptions<TransactionModel>(
    req,
    prisma.transaction,
    ['type'], // searchable fields
    ['amount', 'date', 'createdAt'], // sortable fields
  );

  return paginatedTransactions;
};

export const getTransactionById = async (
  id: string,
): Promise<TransactionModel> => {
  return await transactionRepository.findById(id);
};

// Create a new transaction
export const createTransaction = async (
  userId: string,
  transactionData: CreateTransactionDto,
): Promise<TransactionModel> => {
  return await transactionRepository.create(userId, transactionData);
};

// Update a transaction
export const updateTransaction = async (
  id: string,
  updateData: UpdateTransactionDto,
): Promise<TransactionModel> => {
  return await transactionRepository.update(id, updateData);
};

// Partially update a transaction (same function can handle full or partial updates)
export const updateTransactionPart = async (
  id: string,
  updates: UpdateTransactionDto,
  userId: string,
): Promise<TransactionModel> => {
  await validateTransactionOwnership(id, userId);
  return await transactionRepository.update(id, updates);
};

// Delete (soft delete) a transaction
export const deleteTransaction = async (
  id: string,
): Promise<TransactionModel> => {
  return await transactionRepository.softDelete(id);
};

// Ensure the transaction belongs to the user before allowing modification
const validateTransactionOwnership = async (
  id: string,
  userId: string,
): Promise<void> => {
  const transaction = await transactionRepository.findById(id);
  if (!transaction || transaction.userId !== userId) {
    throw new UnauthorizedError('Not authorized to modify this transaction');
  }
};

export const getTransactionSummary = async () => {
  // Calculate totals
  const totalIncome = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'INCOME' }, // Calculate total income
  });

  const totalExpenses = await prisma.transaction.aggregate({
    _sum: { amount: true },
    where: { type: 'EXPENSE' }, // Calculate total expenses
  });

  const balance =
    (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0); // Calculate balance

  return {
    totalIncome: totalIncome._sum.amount || 0,
    totalExpenses: totalExpenses._sum.amount || 0,
    balance,
  };
};
