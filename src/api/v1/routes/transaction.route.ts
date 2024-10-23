import { Router } from 'express';

import { transactionController } from '../controllers';

const router = Router();

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

export default router;
