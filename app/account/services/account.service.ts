import api from '@/lib/api';
import { METHODS } from '@/lib/constant';

// Interface untuk request body
export interface LoginRequest {
  username: string;
  password: string;
}

// Interface untuk response data
export interface LoginResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      username: string;
      // Tambahkan field lain sesuai dokumentasi API
    };
    token: string;
    stan_id?: number;
  };
}

// Service function untuk login
export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.request<LoginResponse>({
      method: METHODS.POST,
      url: '/api/auth/login', 
      data,
    });

    if (response.data.success !== true) {
      throw new Error('Login failed: Response success is not true');
    }

    if (!response.data.data.user) {
      throw new Error('Login failed: User data is missing');
    }

    if (!response.data.data.token || typeof response.data.data.token !== 'string' || response.data.data.token.length === 0) {
      throw new Error('Login failed: Token is invalid or empty');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.data.data.token);
      // Simpan stan_id jika ada
      if (response.data.data.stan_id) {
        localStorage.setItem('stanId', response.data.data.stan_id.toString());
      } else {
        console.warn('stan_id not found in response');
      }
    }

    return response.data;
  } catch (error) {
    // Handle error sesuai dokumentasi
    if (error.response?.status === 401) {
      throw new Error('Invalid username or password');
    }
    throw new Error(error.message || 'Login failed');
  }
};

// Tambahkan import types
import { RegisterStanRequest, RegisterStanResponse } from '@/app/account/types/account.types';

// Service function untuk register stan (tanpa token)
export const registerStanService = async (data: RegisterStanRequest): Promise<RegisterStanResponse> => {
  try {
    const response = await api.request<RegisterStanResponse>({
      method: METHODS.POST,
      url: '/api/auth/register-admin-stan',
      data,
      // Hapus headers Authorization karena tidak memerlukan token
    });

    // Validasi response sesuai dokumentasi
    if (response.status !== 201) {
      throw new Error('Register failed: Status is not 201');
    }

    if (response.data.success !== true) {
      throw new Error('Register failed: Response success is not true');
    }

    if (response.data.data.role !== 'admin_stan') {
      throw new Error('Register failed: User does not have admin_stan role');
    }

    return response.data;
  } catch (error) {
    // Handle error
    throw new Error(error.message || 'Register stan failed');
  }
};