import * as yup from 'yup';

export const createCategorySchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
});

export const updateCategorySchema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
});