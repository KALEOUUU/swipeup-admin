import * as yup from 'yup';

export const createStandCanteenSchema = yup.object().shape({
  stand_id: yup.number().required('Stand ID is required').positive('Stand ID must be a positive number'),
  store_name: yup.string().required('Store name is required').min(2, 'Store name must be at least 2 characters').max(100, 'Store name must be at most 100 characters'),
  qris: yup.string().required('QRIS is required'),
  is_active: yup.boolean().required('Active status is required'),
});

export const updateStandCanteenSchema = yup.object().shape({
  store_name: yup.string().required('Store name is required').min(2, 'Store name must be at least 2 characters').max(100, 'Store name must be at most 100 characters'),
  qris: yup.string().required('QRIS is required'),
  is_active: yup.boolean().required('Active status is required'),
});