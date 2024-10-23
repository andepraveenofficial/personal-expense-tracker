import { Request } from 'express';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { categoryRepository } from '../repositories';
import { applyQueryOptions } from '../../../utils/query.utils';
import prisma from '../../../config/prisma';

export const getAllCategories = async (req: Request) => {
  return await applyQueryOptions(
    req,
    prisma.category,
    ['name', 'type'],
    ['name', 'type', 'createdAt'],
  );
};

export const createCategory = async (categoryData: CreateCategoryDto) => {
  return await categoryRepository.create(categoryData);
};

export const updateCategory = async (
  id: string,
  updateData: UpdateCategoryDto,
) => {
  return await categoryRepository.update(id, updateData);
};

export const deleteCategory = async (id: string) => {
  return await categoryRepository.softDelete(id);
};
