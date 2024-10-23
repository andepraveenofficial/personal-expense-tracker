export interface CreateTransactionDto {
  type: string;
  amount: number;
  description?: string;
  date?: Date;
  categoryId: string;
  userId: string;
}

export interface UpdateTransactionDto {
  type?: string;
  amount?: number;
  description?: string;
  date?: Date;
  categoryId?: string;
}
