import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import { Menu, MenuResponse, CreateMenuInput, CreateMenuResponse, UpdateMenuInput, UpdateMenuResponse, GetMenuResponse } from '../types/menu.type';

export const menuService = {
    getAllMenu: async (): Promise<Menu[]> => {
        const response = await api.request<MenuResponse>({
            method: METHODS.GET,
            url: '/api/menu',
        });
        return response.data.data;
    },
    getMenuById: async (id: number): Promise<Menu> => {
        const response = await api.request<GetMenuResponse>({
            method: METHODS.GET,
            url: `/api/menu/${id}`,
        });
        return response.data.data;
    },
    createMenu: async (input: CreateMenuInput): Promise<Menu> => {
        const response = await api.request<CreateMenuResponse>({
            method: METHODS.POST,
            url: '/api/menu',
            data: input,
        });
        return response.data.data;
    },

    updateMenu: async (id: number, input: UpdateMenuInput): Promise<Menu> => {
        const response = await api.request<UpdateMenuResponse>({
            method: METHODS.PUT,
            url: `/api/menu/${id}`,
            data: input,
        });
        return response.data.data;
    },
};