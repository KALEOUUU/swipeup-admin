import api from '@/lib/axiosInstance';
import { METHODS } from '@/lib/constant';
import {
    Menu,
    MenuResponse,
    CreateMenuInput,
    CreateMenuResponse,
    UpdateMenuInput,
    UpdateMenuResponse,
    GetMenuResponse,
    GetMenusByStanResponse,
    UpdateStockInput,
    AdjustStockInput,
    SearchMenuResponse,
} from '../types/menu.type';

// Get all menu (Admin Stan)
export const getAllMenu = async (): Promise<Menu[]> => {
    const response = await api.request<MenuResponse>({
        method: METHODS.GET,
        url: '/api/admin-stan/menu',
    });
    return response.data.data;
};

// Get available menu (public or student access)
export const getAvailableMenu = async (): Promise<Menu[]> => {
    const response = await api.request<MenuResponse>({
        method: METHODS.GET,
        url: '/api/menu/available',
    });
    return response.data.data;
};

// Get menu by ID
export const getMenuById = async (id: number): Promise<Menu> => {
    const response = await api.request<GetMenuResponse>({
        method: METHODS.GET,
        url: `/api/menu/${id}`,
    });
    return response.data.data;
};

// Get menu by stan ID
export const getMenusByStan = async (stanId: number): Promise<Menu[]> => {
    const response = await api.request<GetMenusByStanResponse>({
        method: METHODS.GET,
        url: `/api/public/menu/by-stan?stan_id=${stanId}`,
    });
    return response.data.data;
};

// Search menu by name
export const searchMenuByName = async (name: string): Promise<Menu[]> => {
    const response = await api.request<SearchMenuResponse>({
        method: METHODS.GET,
        url: `/api/menu/search?name=${encodeURIComponent(name)}`,
    });
    return response.data.data;
};

// Create menu (Admin Stan only)
export const createMenu = async (input: CreateMenuInput): Promise<Menu> => {
    const response = await api.request<CreateMenuResponse>({
        method: METHODS.POST,
        url: '/api/admin-stan/menu',
        data: input,
    });
    return response.data.data;
};

// Update menu (Admin Stan only)
export const updateMenu = async (id: number, input: UpdateMenuInput): Promise<Menu> => {
    const response = await api.request<UpdateMenuResponse>({
        method: METHODS.PUT,
        url: `/api/admin-stan/menu/${id}`,
        data: input,
    });
    return response.data.data;
};

// Update menu stock
export const updateMenuStock = async (id: number, input: UpdateStockInput): Promise<Menu> => {
    const response = await api.request<UpdateMenuResponse>({
        method: METHODS.PUT,
        url: `/api/admin-stan/menu/${id}/stock`,
        data: input,
    });
    return response.data.data;
};

// Adjust menu stock (increment/decrement)
export const adjustMenuStock = async (id: number, input: AdjustStockInput): Promise<Menu> => {
    const response = await api.request<UpdateMenuResponse>({
        method: METHODS.PUT,
        url: `/api/admin-stan/menu/${id}/adjust-stock`,
        data: input,
    });
    return response.data.data;
};

// Delete menu (Admin Stan only)
export const deleteMenu = async (id: number): Promise<void> => {
    await api.request({
        method: METHODS.DELETE,
        url: `/api/admin-stan/menu/${id}`,
    });
};