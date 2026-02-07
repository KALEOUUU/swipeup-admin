import api from '@/lib/axiosInstance';
import { StandCanteen, CreateStandCanteenRequest, UpdateStandCanteenRequest } from '../types/stand.types';

// Get all stand canteens
export const getAllStandCanteens = async (): Promise<StandCanteen[]> => {
  try {
    const response = await api.get('/admin/stand-canteens');
    return response.data; 
  } catch (error) {
    console.error('Error fetching stand canteens:', error);
    throw error;
  }
};

// Get stand canteen by ID
export const getStandCanteenById = async (id: number): Promise<StandCanteen> => {
  try {
    const response = await api.get(`/admin/stand-canteens/${id}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching stand canteen by ID:', error);
    throw error;
  }
};

// Create stand canteen
export const createStandCanteen = async (data: CreateStandCanteenRequest): Promise<StandCanteen> => {
  try {
    const response = await api.post('/admin/stand-canteens', data);
    return response.data;
  } catch (error) {
    console.error('Error creating stand canteen:', error);
    throw error;
  }
};

// Update stand canteen by ID
export const updateStandCanteen = async (id: number, data: UpdateStandCanteenRequest): Promise<StandCanteen> => {
  try {
    const response = await api.put(`/admin/stand-canteens/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating stand canteen:', error);
    throw error;
  }
};

// Delete stand canteen by ID
export const deleteStandCanteen = async (id: number): Promise<void> => {
  try {
    await api.delete(`/admin/stand-canteens/${id}`);
  } catch (error) {
    console.error('Error deleting stand canteen:', error);
    throw error;
  }
};
