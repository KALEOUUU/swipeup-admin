import React from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const productSchema = yup.object({
  nama_produk: yup.string().required('Nama produk is required'),
  harga: yup.number().required('Harga is required').positive('Harga must be positive'),
  stok: yup.number().required('Stok is required').min(0, 'Stok cannot be negative'),
});

type ProductFormData = yup.InferType<typeof productSchema>;

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData;
}

export default function ProductModal({ open, onClose, onSubmit, initialData }: ProductModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || { nama_produk: '', harga: 0, stok: 0 },
  });

  const handleFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {initialData ? 'Edit Product' : 'Add Product'}
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Nama Produk"
              {...register('nama_produk')}
              error={!!errors.nama_produk}
              helperText={errors.nama_produk?.message}
              fullWidth
            />
            <TextField
              label="Harga"
              type="number"
              {...register('harga')}
              error={!!errors.harga}
              helperText={errors.harga?.message}
              fullWidth
            />
            <TextField
              label="Stok"
              type="number"
              {...register('stok')}
              error={!!errors.stok}
              helperText={errors.stok?.message}
              fullWidth
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
