import express from 'express';
import productRoutes from './product.route';
import authRoutes from './auth.route';
import authMiddleware from '../../../middlewares/auth.middleware';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', authMiddleware, productRoutes);

export default router;
