export interface CreateCategoryDto {
  name: string;
  type: string;
}

export interface UpdateCategoryDto {
  name?: string;
  type?: string;
}
