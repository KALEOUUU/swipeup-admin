'use client';

import React from 'react';
import { Box, Stack, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation'; // Tambahkan import useRouter
import CustomCard from '@/components/molecules/card';
import ButtonWithText from '@/components/molecules/button-with-text';
import InputField from '@/components/atoms/input-fields';
import CustomTypography from '@/components/atoms/typography';
import { registerStanSchema, RegisterStanSchemaType } from '@/app/account/validation/aacount.validation';
import { registerStanService } from '@/app/account/services/account.service';
import { showSuccess, showError } from '@/hook/useToast';

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter(); // Inisialisasi router
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterStanSchemaType>({
    resolver: yupResolver(registerStanSchema),
  });

  const onSubmit = async (data: RegisterStanSchemaType) => {
    try {
      // Panggil service tanpa token
      const response = await registerStanService(data);
      console.log('Register successful:', response);
      showSuccess('Admin stan registered successfully!');
      router.push('/account/login');
    } catch (error) {
      console.error('Register error:', error.message);
      showError(error.message || 'Register failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        p: 2,
      }}
    >
      <CustomCard 
        sx={{ 
          maxWidth: 500, 
          width: '100%', 
          borderRadius: 4,
          boxShadow: `0 8px 32px rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.1)`,
          p: 3
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box textAlign="center">
              <CustomTypography variant="logo" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
                SwipeUp
              </CustomTypography>
              <CustomTypography variant="medium" color="text.secondary">
                Register New Admin Stan
              </CustomTypography>
            </Box>

            <Stack spacing={2}>
              <InputField
                label="Username"
                variant="outlined"
                fullWidth
                placeholder="admin_stan_001"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                placeholder="••••••••"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Nama Stan"
                variant="outlined"
                fullWidth
                placeholder="Warung Makan Sejahtera"
                {...register('nama_stan')}
                error={!!errors.nama_stan}
                helperText={errors.nama_stan?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Nama Pemilik"
                variant="outlined"
                fullWidth
                placeholder="Budi Santoso"
                {...register('nama_pemilik')}
                error={!!errors.nama_pemilik}
                helperText={errors.nama_pemilik?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Telp"
                variant="outlined"
                fullWidth
                placeholder="081234567890"
                {...register('telp')}
                error={!!errors.telp}
                helperText={errors.telp?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
            </Stack>

            <ButtonWithText
              text={isSubmitting ? 'Registering...' : 'Register Admin Stan'}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              textVariant="medium"
              type="submit"
              disabled={isSubmitting}
              sx={{ 
                py: 1.5,
                fontSize: '1rem',
                boxShadow: `0 4px 12px rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.3)`
              }}
            />

            <Box textAlign="center">
              <CustomTypography variant="small" color="text.secondary">
                Already have an account?{' '}
                <MuiLink href="/account/login" underline="hover" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Login here
                </MuiLink>
              </CustomTypography>
            </Box>
          </Stack>
        </form>
      </CustomCard>
    </Box>
  );
}