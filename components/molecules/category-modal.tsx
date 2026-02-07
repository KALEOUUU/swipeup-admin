import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createCategorySchema, updateCategorySchema } from '@/app/admin/category/validation/category.validation';
import { createCategory, updateCategory } from '@/app/admin/category/services/category.service';
import { CreateCategoryRequest, UpdateCategoryRequest, Category } from '@/app/admin/category/types/category.types';

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'update';
  initialData?: Category | null;
  onSuccess: (category: Category) => void;
}

export default function CategoryModal({ open, onClose, mode, initialData, onSuccess }: CategoryModalProps) {
  const schema = mode === 'create' ? createCategorySchema : updateCategorySchema;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData ? { name: initialData.name } : { name: '' }
  });

  const onSubmit = async (data: { name: string }) => {
    try {
      let result: Category;
      if (mode === 'create') {
        result = await createCategory(data as CreateCategoryRequest);
      } else {
        result = await updateCategory(initialData!.id, data as UpdateCategoryRequest);
      }
      onSuccess(result);
      onClose();
      reset();
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., show toast
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'create' ? 'Create Category' : 'Update Category'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}