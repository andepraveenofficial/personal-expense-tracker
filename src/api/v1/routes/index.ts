import express from 'express';
import categoryRoutes from './category.route';
import transactionRoutes from './transaction.route';
import authRoutes from './auth.route';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/category', authMiddleware, categoryRoutes);
router.use('/transaction', authMiddleware, transactionRoutes);

export default router;
