import * as yup from 'yup';

export const CreateDiscountSchema = yup.object().shape({
  nama_diskon: yup.string().required('Nama diskon wajib diisi'),
  persentase_diskon: yup.number().min(0, 'Persentase diskon minimal 0').max(100, 'Persentase diskon maksimal 100').required(),
  tanggal_awal: yup.string().required('Tanggal awal wajib diisi'),
  tanggal_akhir: yup.string().required('Tanggal akhir wajib diisi').test('is-after', 'Tanggal akhir harus setelah tanggal awal', function(value) {
    const { tanggal_awal } = this.parent;
    return new Date(value) > new Date(tanggal_awal);
  }),
  tipe_diskon: yup.string().required('Tipe diskon wajib diisi'),
  id_stan: yup.number().integer().positive('ID stan wajib diisi').required(),
  id_menu: yup.array().of(yup.number().integer().positive()).min(1, 'Minimal satu menu harus dipilih').required(),
});

export type CreateDiscountSchemaType = yup.InferType<typeof CreateDiscountSchema>;

export const CreateDiscountForStanSchema = yup.object().shape({
  nama_diskon: yup.string().required('Nama diskon wajib diisi'),
  persentase_diskon: yup.number().min(0, 'Persentase diskon minimal 0').max(100, 'Persentase diskon maksimal 100').required(),
  tanggal_awal: yup.string().required('Tanggal awal wajib diisi'),
  tanggal_akhir: yup.string().required('Tanggal akhir wajib diisi').test('is-after', 'Tanggal akhir harus setelah tanggal awal', function(value) {
    const { tanggal_awal } = this.parent;
    return new Date(value) > new Date(tanggal_awal);
  }),
  tipe_diskon: yup.string().required('Tipe diskon wajib diisi'),
  id_stan: yup.number().integer().positive('ID stan wajib diisi').required(),
});

export type CreateDiscountForStanSchemaType = yup.InferType<typeof CreateDiscountForStanSchema>;

export const UpdateDiscountSchema = yup.object().shape({
  nama_diskon: yup.string().required('Nama diskon wajib diisi'),
  persentase_diskon: yup.number().min(0, 'Persentase diskon minimal 0').max(100, 'Persentase diskon maksimal 100').required(),
  tanggal_awal: yup.string().required('Tanggal awal wajib diisi'),
  tanggal_akhir: yup.string().required('Tanggal akhir wajib diisi').test('is-after', 'Tanggal akhir harus setelah tanggal awal', function(value) {
    const { tanggal_awal } = this.parent;
    return new Date(value) > new Date(tanggal_awal);
  }),
});

export type UpdateDiscountSchemaType = yup.InferType<typeof UpdateDiscountSchema>;