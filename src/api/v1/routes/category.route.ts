import { Router } from 'express';

import { categoryController } from '../controllers';

const router = Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
