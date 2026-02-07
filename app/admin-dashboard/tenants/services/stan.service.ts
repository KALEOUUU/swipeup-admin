import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import {
    Stan,
    CreateStanInput,
    UpdateStanInput,
    StanResponse,
    GetAllStanResponse,
} from '../types/stan.types';

// Get all stan (SuperAdmin only)
export const getAllStan = async (): Promise<Stan[]> => {
    const response = await api.request<GetAllStanResponse>({
        method: METHODS.GET,
        url: '/api/superadmin/stan',
    });
    return response.data.data;
};

// Get stan by ID
export const getStanById = async (id: number): Promise<Stan> => {
    const response = await api.request<StanResponse>({
        method: METHODS.GET,
        url: `/api/stan/${id}`,
    });
    return response.data.data;
};

// Get stan by user ID
export const getStanByUserId = async (userId: number): Promise<Stan> => {
    const response = await api.request<StanResponse>({
        method: METHODS.GET,
        url: `/api/stan/user/${userId}`,
    });
    return response.data.data;
};

// Create stan profile (Admin Stan only)
export const createStanProfile = async (input: CreateStanInput): Promise<Stan> => {
    const response = await api.request<StanResponse>({
        method: METHODS.POST,
        url: '/api/admin-stan/stan/profile',
        data: input,
    });
    return response.data.data;
};

// Update stan profile (Admin Stan only)
export const updateStanProfile = async (id: number, input: UpdateStanInput): Promise<Stan> => {
    const response = await api.request<StanResponse>({
        method: METHODS.PUT,
        url: `/api/admin-stan/stan/${id}`,
        data: input,
    });
    return response.data.data;
};

// Delete stan (SuperAdmin only)
export const deleteStan = async (id: number): Promise<void> => {
    await api.request({
        method: METHODS.DELETE,
        url: `/api/superadmin/stan/${id}`,
    });
};
