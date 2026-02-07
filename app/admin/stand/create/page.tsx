'use client';

import React, { useState } from 'react';
import { Box, Stack, Checkbox, FormControlLabel, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import CustomCard from '@/components/molecules/card';
import ButtonWithText from '@/components/molecules/button-with-text';
import InputField from '@/components/atoms/input-fields';
import CustomTypography from '@/components/atoms/typography';
import Sidebar from '@/components/layouts/sidebar';
import { createStandCanteenSchema } from '../validation/stand.validation';
import { createStandCanteen } from '../services/stand.service';
import { CreateStandCanteenRequest } from '../types/stand.types';
import { showSuccess, showError } from '@/hook/useToast';
import { convertImageToBase64 } from '@/helper/image-converter';

export default function CreateStandCanteenPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateStandCanteenRequest>({
    resolver: yupResolver(createStandCanteenSchema),
    defaultValues: {
      stand_id: 0,
      store_name: '',
      qris_base64: '',
      is_active: true,
    },
  });

  const isActive = watch('is_active');

  const handleQrisFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setValue('qris_base64', base64);
      } catch (error) {
        showError('Failed to convert image to base64');
      }
    }
  };

  const onSubmit = async (data: CreateStandCanteenRequest) => {
    setIsSubmitting(true);
    try {
      await createStandCanteen(data);
      showSuccess('Stand canteen created successfully');
      router.push('/admin/stand'); // Redirect to stand canteens list
    } catch (error) {
      showError('Failed to create stand canteen');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <CustomTypography variant="h4" sx={{ mb: 3 }}>
          Create Stand Canteen
        </CustomTypography>
        <CustomCard sx={{ maxWidth: 600, p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <InputField
                label="Stand ID"
                type="number"
                fullWidth
                {...register('stand_id')}
                error={!!errors.stand_id}
                helperText={errors.stand_id?.message}
              />
              <InputField
                label="Store Name"
                fullWidth
                {...register('store_name')}
                error={!!errors.store_name}
                helperText={errors.store_name?.message}
              />
              <Box>
                <CustomTypography variant="body1" sx={{ mb: 1 }}>
                  QRIS Image
                </CustomTypography>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleQrisFileChange}
                  sx={{ width: '100%' }}
                />
                {errors.qris_base64 && (
                  <CustomTypography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.qris_base64.message}
                  </CustomTypography>
                )}
              </Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isActive}
                    onChange={(e) => setValue('is_active', e.target.checked)}
                  />
                }
                label="Is Active"
              />
              <ButtonWithText
                text={isSubmitting ? 'Creating...' : 'Create Stand Canteen'}
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                disabled={isSubmitting}
              />
            </Stack>
          </form>
        </CustomCard>
      </Box>
    </Box>
  );
}