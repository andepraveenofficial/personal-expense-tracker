import express from 'express';
import categoryRoutes from './category.route';
import transactionRoutes from './transaction.route';
import summaryRoutes from './summary.route';
import authRoutes from './auth.route';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', authMiddleware, transactionRoutes);
router.use('/summary', authMiddleware, summaryRoutes);

export default router;
