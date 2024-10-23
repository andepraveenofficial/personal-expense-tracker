import { Request } from 'express';
import { CreateTransactionDto, UpdateTransactionDto } from '../dtos';
import { transactionRepository } from '../repositories';
import {
  applyQueryOptions,
  PaginatedResponse,
} from '../../../utils/query.utils';
import prisma from '../../../config/prisma';
import { UnauthorizedError } from './../../../handlers/apiCustomError.handler';
import { TransactionModel } from '../models';

// Get all transactions with pagination and user filtering
export const getAllTransactions = async (
  req: Request,
): Promise<PaginatedResponse<TransactionModel>> => {
  const paginatedTransactions = await applyQueryOptions<TransactionModel>(
    req,
    prisma.transaction,
    ['INCOME', 'EXPENSE'], // searchable fields
    ['amount', 'date', 'createdAt'], // sortable fields
  );

  return paginatedTransactions;
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
