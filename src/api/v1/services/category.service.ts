import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { categoryRepository } from '../repositories';

export const getAllCategories = async () => {
  const allCategories = await categoryRepository.getAll();
  return allCategories;
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
