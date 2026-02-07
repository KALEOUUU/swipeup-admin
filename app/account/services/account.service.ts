import api from '@/lib/axiosInstance';
import { METHODS } from '@/lib/constant';
import { AxiosError } from 'axios'; // Add this import for proper error typing

// Interface untuk request body
export interface LoginRequest {
  username: string;
  password: string;
}

// Interface untuk register response
export interface RegisterResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      username: string;
      role: string;
    };
  };
}

// Update interface untuk login response (hapus success, asumsikan data langsung)
export interface LoginResponse {
  user: {
    id: string;
    username: string;
    role: string;
  };
  token: string;
  stan_id?: number;
}

// Service function untuk login
export const loginService = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.request<LoginResponse>({
      method: METHODS.POST,
      url: 'auth/login',
      data,
    });

    // Hapus pengecekan success, asumsikan response langsung data
    if (!response.data.user) {
      throw new Error('Login failed: User data is missing');
    }

    if (!response.data.token || typeof response.data.token !== 'string' || response.data.token.length === 0) {
      throw new Error('Login failed: Token is invalid or empty');
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', response.data.user.role); // Simpan role untuk routing
      // Simpan stan_id jika ada
      if (response.data.stan_id) {
        localStorage.setItem('stanId', response.data.stan_id.toString());
      } else {
        console.warn('stan_id not found in response');
      }
    }

    return response.data;
  } catch (error) {
    // Type the error as AxiosError or Error to access properties safely
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        throw new Error('Invalid username or password');
      }
      throw new Error(error.message || 'Login failed');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'Login failed');
    } else {
      throw new Error('Login failed');
    }
  }
};

// Tambahkan import types
import { RegisterRequest } from '@/app/account/types/account.types';

// Service function untuk register (tanpa token)
export const registerService = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await api.request({
      method: METHODS.POST,
      url: 'auth/register',
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

    return response.data;
  } catch (error) {
    // Type the error as AxiosError or Error to access properties safely
    if (error instanceof AxiosError) {
      throw new Error(error.message || 'Register failed');
    } else if (error instanceof Error) {
      throw new Error(error.message || 'Register failed');
    } else {
      throw new Error('Register failed');
    }
  }
};