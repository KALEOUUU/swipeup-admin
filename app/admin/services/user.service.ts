import api from '@/lib/axiosInstance';
import { METHODS } from '@/lib/constant';
import {
    User,
    CreateUserInput,
    UserResponse,
    GetAllUsersResponse,
} from '../types/user.types';

// Get all users (SuperAdmin only)
export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.request<GetAllUsersResponse>({
        method: METHODS.GET,
        url: '/api/superadmin/users',
    });
    return response.data.data;
};

// Get user by ID (SuperAdmin only)
export const getUserById = async (id: number): Promise<User> => {
    const response = await api.request<UserResponse>({
        method: METHODS.GET,
        url: `/api/superadmin/users/${id}`,
    });
    return response.data.data;
};

// Create user (SuperAdmin only)
export const createUser = async (input: CreateUserInput): Promise<User> => {
    const response = await api.request<UserResponse>({
        method: METHODS.POST,
        url: '/api/superadmin/users',
        data: input,
    });
    return response.data.data;
};

// Delete user (SuperAdmin only)
export const deleteUser = async (id: number): Promise<void> => {
    await api.request({
        method: METHODS.DELETE,
        url: `/api/superadmin/users/${id}`,
    });
};
