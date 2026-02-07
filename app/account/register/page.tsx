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
import { registerSchema, RegisterSchemaType } from '@/app/account/validation/aacount.validation';
import { registerService } from '@/app/account/services/account.service';
import { showSuccess, showError } from '@/hook/useToast';

export default function RegisterPage() {
  const theme = useTheme();
  const router = useRouter(); // Inisialisasi router
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      // Panggil service tanpa token
      const response = await registerService(data);
      console.log('Register successful:', response);
      showSuccess('User registered successfully!');
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
                Register New User
              </CustomTypography>
            </Box>

            <Stack spacing={2}>
              <InputField
                label="Username"
                variant="outlined"
                fullWidth
                placeholder="new_student"
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
                label="Role"
                variant="outlined"
                fullWidth
                placeholder="student"
                {...register('role')}
                error={!!errors.role}
                helperText={errors.role?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Name"
                variant="outlined"
                fullWidth
                placeholder="John Doe"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="john@example.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="Phone"
                variant="outlined"
                fullWidth
                placeholder="08123456789"
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
              <InputField
                label="RFID Card"
                variant="outlined"
                fullWidth
                placeholder="RFID123456"
                {...register('rfid_card')}
                error={!!errors.rfid_card}
                helperText={errors.rfid_card?.message}
                sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'background.paper' } }}
              />
            </Stack>

            <ButtonWithText
              text={isSubmitting ? 'Registering...' : 'Register User'}
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