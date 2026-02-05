import api from '../../../../lib/api';
import { METHODS } from '../../../../lib/constant';
import { GetDiscountsByStanResponse, CreateDiscountRequest, CreateDiscountResponse, CreateDiscountForStanRequest, CreateDiscountForStanResponse, UpdateDiscountRequest, UpdateDiscountResponse } from '../types/discount.types';

export const getDiscountsByStan = async (stanId: number): Promise<GetDiscountsByStanResponse> => {
  const response = await api.request({
    method: METHODS.GET,
    url: `/api/diskon/by-stan?stan_id=${stanId}`,
  });
  return response.data;
};

export const createDiscountForMenu = async (data: CreateDiscountRequest): Promise<CreateDiscountResponse> => {
  const response = await api.request({
    method: METHODS.POST,
    url: '/api/diskon',
    data,
  });
  return response.data;
};

export const createDiscountForStan = async (data: CreateDiscountForStanRequest): Promise<CreateDiscountForStanResponse> => {
  const response = await api.request({
    method: METHODS.POST,
    url: '/api/diskon',
    data,
  });
  return response.data;
};

export const updateDiscountForStan = async (id: number, data: UpdateDiscountRequest): Promise<UpdateDiscountResponse> => {
  const response = await api.request({
    method: METHODS.PUT,
    url: `/api/diskon/${id}`,
    data,
  });
  return response.data;
};

export const updateDiscountForMenu = async (id: number, data: UpdateDiscountRequest): Promise<UpdateDiscountResponse> => {
  const response = await api.request({
    method: METHODS.PUT,
    url: `/api/diskon/${id}`,
    data,
  });
  return response.data;
};