import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
});

// Tambahkan schema untuk register stan
export const registerStanSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  nama_stan: yup
    .string()
    .required('Nama stan is required')
    .min(2, 'Nama stan must be at least 2 characters')
    .max(100, 'Nama stan must be less than 100 characters'),
  nama_pemilik: yup
    .string()
    .required('Nama pemilik is required')
    .min(2, 'Nama pemilik must be at least 2 characters')
    .max(100, 'Nama pemilik must be less than 100 characters'),
  telp: yup
    .string()
    .required('Telp is required')
    .matches(/^[0-9]+$/, 'Telp must be a valid phone number')
    .min(10, 'Telp must be at least 10 digits')
    .max(15, 'Telp must be less than 15 digits'),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
export type RegisterStanSchemaType = yup.InferType<typeof registerStanSchema>;