import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import {
  Diskon,
  CreateDiskonInput,
  UpdateDiskonInput,
  CreateDiskonStanInput,
  CreateDiskonMenuInput,
  DiskonResponse,
  GetAllDiskonResponse,
  GetDiskonByStanResponse,
  GetActiveDiskonResponse,
} from '../types/diskon.types';

// Get all discounts
export const getAllDiskon = async (): Promise<Diskon[]> => {
  const response = await api.request<GetAllDiskonResponse>({
    method: METHODS.GET,
    url: '/api/discounts',
  });
  return response.data.data;
};

// Get discount by ID
export const getDiskonById = async (id: number): Promise<Diskon> => {
  const response = await api.request<DiskonResponse>({
    method: METHODS.GET,
    url: `/api/diskon/${id}`,
  });
  return response.data.data;
};

// Get global discounts
export const getGlobalDiskon = async (): Promise<Diskon[]> => {
  const response = await api.request<GetAllDiskonResponse>({
    method: METHODS.GET,
    url: '/api/diskon/global',
  });
  return response.data.data;
};

// Get discounts by stan
export const getDiskonByStan = async (stanId: number): Promise<Diskon[]> => {
  const response = await api.request<GetDiskonByStanResponse>({
    method: METHODS.GET,
    url: `/api/diskon/by-stan/${stanId}`,
  });
  return response.data.data;
};

// Get active discounts by stan
export const getActiveDiskonByStan = async (stanId: number): Promise<Diskon[]> => {
  const response = await api.request<GetActiveDiskonResponse>({
    method: METHODS.GET,
    url: `/api/diskon/stan/${stanId}/active`,
  });
  return response.data.data;
};

// Create discount
export const createDiskon = async (input: CreateDiskonInput): Promise<Diskon> => {
  const response = await api.request<DiskonResponse>({
    method: METHODS.POST,
    url: '/api/diskon',
    data: input,
  });
  return response.data.data;
};

// Update discount
export const updateDiskon = async (id: number, input: UpdateDiskonInput): Promise<Diskon> => {
  const response = await api.request<DiskonResponse>({
    method: METHODS.PUT,
    url: `/api/diskon/${id}`,
    data: input,
  });
  return response.data.data;
};

// Delete discount
export const deleteDiskon = async (id: number): Promise<void> => {
  await api.request({
    method: METHODS.DELETE,
    url: `/api/diskon/${id}`,
  });
};

// Create discount stan (link discount to stan)
export const createDiskonStan = async (input: CreateDiskonStanInput): Promise<void> => {
  await api.request({
    method: METHODS.POST,
    url: '/api/diskon/stan',
    data: input,
  });
};

// Update discount stan
export const updateDiskonStan = async (id: number, input: CreateDiskonStanInput): Promise<void> => {
  await api.request({
    method: METHODS.PUT,
    url: `/api/diskon/stan/${id}`,
    data: input,
  });
};

// Delete discount stan
export const deleteDiskonStan = async (id: number): Promise<void> => {
  await api.request({
    method: METHODS.DELETE,
    url: `/api/diskon/stan/${id}`,
  });
};

// Create discount menu (link discount to menu)
export const createDiskonMenu = async (input: CreateDiskonMenuInput): Promise<void> => {
  await api.request({
    method: METHODS.POST,
    url: '/api/diskon/menu',
    data: input,
  });
};

// Update discount menu
export const updateDiskonMenu = async (id: number, input: CreateDiskonMenuInput): Promise<void> => {
  await api.request({
    method: METHODS.PUT,
    url: `/api/diskon/menu/${id}`,
    data: input,
  });
};

// Delete discount menu
export const deleteDiskonMenu = async (id: number): Promise<void> => {
  await api.request({
    method: METHODS.DELETE,
    url: `/api/diskon/menu/${id}`,
  });
};
