'use client';

import React, { useState, useEffect } from 'react';
import { Box, Stack, Checkbox, FormControlLabel, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useParams } from 'next/navigation';
import CustomCard from '@/components/molecules/card';
import ButtonWithText from '@/components/molecules/button-with-text';
import InputField from '@/components/atoms/input-fields';
import CustomTypography from '@/components/atoms/typography';
import Sidebar from '@/components/layouts/sidebar';
import { updateStandCanteenSchema } from '../../validation/stand.validation';
import { getStandCanteenById, updateStandCanteen } from '../../services/stand.service';
import { UpdateStandCanteenRequest, StandCanteen } from '../../types/stand.types';
import { showSuccess, showError } from '@/hook/useToast';
import { convertImageToBase64 } from '@/helper/image-converter';

export default function UpdateStandCanteenPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.Id as string, 10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UpdateStandCanteenRequest>({
    resolver: yupResolver(updateStandCanteenSchema),
    defaultValues: {
      store_name: '',
      qris: '',
      is_active: true,
    },
  });

  const isActive = watch('is_active');

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: StandCanteen = await getStandCanteenById(id);
        setValue('store_name', data.store_name);
        setValue('qris', data.qris);
        setValue('is_active', data.is_active);
      } catch (error) {
        showError('Failed to fetch stand canteen data');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const handleQrisFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertImageToBase64(file);
        setValue('qris', base64);
      } catch (error) {
        showError('Failed to convert image to base64');
      }
    }
  };

  const onSubmit = async (data: UpdateStandCanteenRequest) => {
    setIsSubmitting(true);
    try {
      await updateStandCanteen(id, data);
      showSuccess('Stand canteen updated successfully');
      router.push('/admin/stand'); // Redirect to stand canteens list
    } catch (error) {
      showError('Failed to update stand canteen');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CustomTypography>Loading...</CustomTypography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <CustomTypography variant="h4" sx={{ mb: 3 }}>
          Update Stand Canteen
        </CustomTypography>
        <CustomCard sx={{ maxWidth: 600, p: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
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
                {errors.qris && (
                  <CustomTypography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.qris.message}
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
                text={isSubmitting ? 'Updating...' : 'Update Stand Canteen'}
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