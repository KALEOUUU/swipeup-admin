import api from '../../../../lib/axiosInstance';
import { Category, CreateCategoryRequest, UpdateCategoryRequest } from '../types/category.types';

// Service untuk get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('/admin/categories');
    return response.data; 
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; 
  }
};

// Service untuk create category
export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
  try {
    const response = await api.post('/admin/categories', data);
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

// Service untuk update category by ID
export const updateCategory = async (id: number, data: UpdateCategoryRequest): Promise<Category> => {
  try {
    const response = await api.put(`/admin/categories/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Service untuk delete category by ID
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/admin/categories/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; 
  }
};