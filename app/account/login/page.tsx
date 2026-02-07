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
import { loginSchema, LoginSchemaType } from '@/app/account/validation/aacount.validation';
import { loginService } from '@/app/account/services/account.service';
import { showSuccess, showError } from '@/hook/useToast';

// Fungsi untuk decode role dari token JWT
const getRoleFromToken = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter(); // Inisialisasi router
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await loginService({
        username: data.username,
        password: data.password,
      });
      console.log('Login successful:', response);
      showSuccess('Login successful!');

      // Decode token untuk mendapatkan role dan redirect sesuai
      const token = response.token;
      const role = getRoleFromToken(token);
      if (role === 'admin') {
        router.push('/admin');
      } else if (role === 'stand_admin') {
        router.push('/stand');
      } else {
        router.push('/account/login');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      showError(error.message || 'Login failed');
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
          p: 3,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Box textAlign="center">
              <CustomTypography variant="logo" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
                SwipeUp
              </CustomTypography>
              <CustomTypography variant="medium" color="text.secondary">
                Login to Your Account
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
            </Stack>

            <ButtonWithText
              text={isSubmitting ? 'Logging in...' : 'Login'}
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
                Dont have an account?{' '}
                <MuiLink href="/account/register" underline="hover" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Register here
                </MuiLink>
              </CustomTypography>
            </Box>
          </Stack>
        </form>
      </CustomCard>
    </Box>
  );
}