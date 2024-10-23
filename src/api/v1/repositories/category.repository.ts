import prisma from '../../../config/prisma';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos';
import { NotFoundError } from '../../../handlers/apiCustomError.handler';

export const create = async (categoryData: CreateCategoryDto) => {
  return await prisma.category.create({ data: categoryData });
};

export const update = async (id: string, updateData: UpdateCategoryDto) => {
  const category = await prisma.category.update({
    where: { id },
    data: updateData,
  });
  if (!category) {
    throw new NotFoundError('Category not found');
  }
  return category;
};

export const softDelete = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};
