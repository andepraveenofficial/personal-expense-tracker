import { Request, Response } from 'express';
import { transactionService } from '../services';
import { CreateTransactionDto, UpdateTransactionDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import asyncHandler from '../../../handlers/async.handler';
import { AuthRequest } from '../../../middlewares/auth.middleware';

export const getAllTransactions = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const transactions = await transactionService.getAllTransactions(req);
    new ApiResponse(
      res,
      200,
      'Successfully Retrieved Transactions',
      transactions,
    );
  },
);

export const createTransaction = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.userId; // Extract userId from authenticated request

    if (!userId) {
      throw new Error('User not found');
    }

    const transactionData: CreateTransactionDto = {
      ...req.body,
    };
    const newTransaction = await transactionService.createTransaction(
      userId,
      transactionData,
    ); // Pass userId to service
    new ApiResponse(
      res,
      201,
      'Transaction created successfully',
      newTransaction,
    );
  },
);

export const getTransactionById = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    new ApiResponse(
      res,
      200,
      'Transaction Retrieved successfully',
      transaction,
    );
  },
);

export const updateTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateTransactionDto = req.body;
    const updatedTransaction = await transactionService.updateTransaction(
      id,
      updateData,
    );
    new ApiResponse(
      res,
      200,
      'Transaction updated successfully',
      updatedTransaction,
    );
  },
);

export const deleteTransaction = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await transactionService.deleteTransaction(id);
    new ApiResponse(res, 200, 'Transaction deleted successfully', null);
  },
);

export const getTransactionSummary = asyncHandler(
  async (req: Request, res: Response) => {
    // Retrieve summary from the transaction service
    const summary = await transactionService.getTransactionSummary();

    new ApiResponse(
      res,
      200,
      'Transaction summary retrieved successfully',
      summary,
    );
  },
);
