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

// Tambahkan schema untuk register
export const registerSchema = yup.object({
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
  role: yup
    .string()
    .required('Role is required')
    .oneOf(['student', 'admin'], 'Role must be student or admin'),
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be a valid email address'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^[0-9]+$/, 'Phone must be a valid phone number')
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone must be less than 15 digits'),
  rfid_card: yup
    .string()
    .required('RFID card is required')
    .min(1, 'RFID card is required'),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
export type RegisterSchemaType = yup.InferType<typeof registerSchema>;