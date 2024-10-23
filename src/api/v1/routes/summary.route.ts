import { Router } from 'express';

import { transactionController } from '../controllers';

const router = Router();

router.get('/', transactionController.getTransactionSummary);

export default router;
