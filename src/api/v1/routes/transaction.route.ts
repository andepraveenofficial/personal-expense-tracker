import { Router } from 'express';

import { transactionController } from '../controllers';

const router = Router();

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransactionById)
  .put(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

router.get('/', transactionController.getTransactionSummary);

export default router;
