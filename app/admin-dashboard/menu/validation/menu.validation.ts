import * as yup from 'yup';

export const createMenuSchema = yup.object({
    nama_makanan: yup
        .string()
        .required('Nama makanan is required')
        .min(2, 'Nama makanan must be at least 2 characters')
        .max(100, 'Nama makanan must be less than 100 characters'),
    harga: yup
        .number()
        .required('Harga is required')
        .positive('Harga must be a positive number')
        .integer('Harga must be an integer'),
    jenis: yup
        .string()
        .required('Jenis is required')
        .oneOf(['makanan', 'minuman'], 'Jenis must be either "makanan" or "minuman"'),
    deskripsi: yup
        .string()
        .optional()
        .max(500, 'Deskripsi must be less than 500 characters'),
    stock: yup
        .number()
        .required('Stock is required')
        .integer('Stock must be an integer')
        .min(0, 'Stock must be at least 0'),
    foto: yup
        .string()
        .required('Foto is required')
        .test('is-valid-image', 'Foto must be a valid base64 image or URL', (value) => {
            if (!value) return false;
            // Check if it's a base64 data URI
            const base64Regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
            if (base64Regex.test(value)) return true;
            // Check if it's a URL
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        }),
    id_stan: yup
        .number()
        .required('ID Stan is required')
        .positive('ID Stan must be a positive number')
        .integer('ID Stan must be an integer'),
});

export type CreateMenuSchemaType = yup.InferType<typeof createMenuSchema>;

export const updateMenuSchema = yup.object({
    nama_makanan: yup
        .string()
        .optional()
        .min(2, 'Nama makanan must be at least 2 characters')
        .max(100, 'Nama makanan must be less than 100 characters'),
    harga: yup
        .number()
        .optional()
        .positive('Harga must be a positive number')
        .integer('Harga must be an integer'),
    jenis: yup
        .string()
        .optional()
        .oneOf(['makanan', 'minuman'], 'Jenis must be either "makanan" or "minuman"'),
    deskripsi: yup
        .string()
        .optional()
        .max(500, 'Deskripsi must be less than 500 characters'),
    stock: yup
        .number()
        .optional()
        .integer('Stock must be an integer')
        .min(0, 'Stock must be at least 0'),
    foto: yup
        .string()
        .optional()
        .test('is-valid-image', 'Foto must be a valid base64 image or URL', (value) => {
            if (!value) return true; // optional
            const base64Regex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,/;
            if (base64Regex.test(value)) return true;
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        }),
});

export type UpdateMenuSchemaType = yup.InferType<typeof updateMenuSchema>;