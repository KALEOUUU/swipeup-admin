import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import {
    Siswa,
    CreateSiswaInput,
    UpdateSiswaInput,
    SiswaResponse,
    GetAllSiswaResponse,
} from '../types/siswa.types';

// Get all siswa
export const getAllSiswa = async (): Promise<Siswa[]> => {
    const response = await api.request<GetAllSiswaResponse>({
        method: METHODS.GET,
        url: '/api/siswa',
    });
    return response.data.data;
};

// Get siswa by ID
export const getSiswaById = async (id: number): Promise<Siswa> => {
    const response = await api.request<SiswaResponse>({
        method: METHODS.GET,
        url: `/api/siswa/${id}`,
    });
    return response.data.data;
};

// Get siswa by user ID
export const getSiswaByUserId = async (userId: number): Promise<Siswa> => {
    const response = await api.request<SiswaResponse>({
        method: METHODS.GET,
        url: `/api/siswa/user/${userId}`,
    });
    return response.data.data;
};

// Create siswa
export const createSiswa = async (input: CreateSiswaInput): Promise<Siswa> => {
    const response = await api.request<SiswaResponse>({
        method: METHODS.POST,
        url: '/api/siswa',
        data: input,
    });
    return response.data.data;
};

// Update siswa
export const updateSiswa = async (id: number, input: UpdateSiswaInput): Promise<Siswa> => {
    const response = await api.request<SiswaResponse>({
        method: METHODS.PUT,
        url: `/api/siswa/${id}`,
        data: input,
    });
    return response.data.data;
};

// Delete siswa
export const deleteSiswa = async (id: number): Promise<void> => {
    await api.request({
        method: METHODS.DELETE,
        url: `/api/siswa/${id}`,
    });
};
