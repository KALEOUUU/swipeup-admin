import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import {
    Transaksi,
    CreateTransaksiInput,
    UpdateTransaksiStatusInput,
    TransaksiResponse,
    GetAllTransaksiResponse,
    GetTransaksiBySiswaResponse,
} from '../types/transaksi.types';

// Get all transactions (Admin Stan only - shows transactions for their stan)
export const getAllTransaksi = async (): Promise<Transaksi[]> => {
    const response = await api.request<GetAllTransaksiResponse>({
        method: METHODS.GET,
        url: '/api/admin-stan/transactions',
    });
    return response.data.data;
};

// Get transaction by ID
export const getTransaksiById = async (id: number): Promise<Transaksi> => {
    const response = await api.request<TransaksiResponse>({
        method: METHODS.GET,
        url: `/api/transaksi/${id}`,
    });
    return response.data.data;
};

// Get transactions by siswa ID
export const getTransaksiBySiswaId = async (siswaId: number): Promise<Transaksi[]> => {
    const response = await api.request<GetTransaksiBySiswaResponse>({
        method: METHODS.GET,
        url: `/api/transaksi/siswa/${siswaId}`,
    });
    return response.data.data;
};

// Create transaction
export const createTransaksi = async (input: CreateTransaksiInput): Promise<Transaksi> => {
    const response = await api.request<TransaksiResponse>({
        method: METHODS.POST,
        url: '/api/transaksi',
        data: input,
    });
    return response.data.data;
};

// Update transaction status
export const updateTransaksiStatus = async (
    id: number,
    input: UpdateTransaksiStatusInput
): Promise<Transaksi> => {
    const response = await api.request<TransaksiResponse>({
        method: METHODS.PUT,
        url: `/api/transaksi/${id}/status`,
        data: input,
    });
    return response.data.data;
};
