import { Request, Response } from 'express';
import { categoryService } from '../services';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import ApiResponse from '../../../handlers/apiResponse.handler';
import asyncHandler from '../../../handlers/async.handler';

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await categoryService.getAllCategories();
    new ApiResponse(res, 200, 'Successfully Retrieved Categories', categories);
  },
);

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categoryData: CreateCategoryDto = req.body;
    const newCategory = await categoryService.createCategory(categoryData);
    new ApiResponse(res, 201, 'Category created successfully', newCategory);
  },
);

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateCategoryDto = req.body;
    const updatedCategory = await categoryService.updateCategory(
      id,
      updateData,
    );
    new ApiResponse(res, 200, 'Category updated successfully', updatedCategory);
  },
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    new ApiResponse(res, 200, 'Category deleted successfully', null);
  },
);
