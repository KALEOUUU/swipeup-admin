import api from '../../../../lib/axiosInstance';
import { GlobalSetting, UpdateGlobalSettingRequest } from '../types/global.types';

// Get all global settings
export const getAllGlobalSettings = async (): Promise<GlobalSetting[]> => {
  try {
    const response = await api.get('/admin/global-settings');
    return response.data; // Asumsikan response.data adalah array of GlobalSetting
  } catch (error) {
    console.error('Error fetching global settings:', error);
    throw error;
  }
};

// Update global setting by key
export const updateGlobalSetting = async (key: string, data: UpdateGlobalSettingRequest): Promise<void> => {
  try {
    await api.put(`/admin/global-settings/${key}`, data);
  } catch (error) {
    console.error('Error updating global setting:', error);
    throw error;
  }
};