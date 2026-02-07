import api from '@/lib/api';
import { METHODS } from '@/lib/constant';
import {
    ActivityLog,
    GetUserActivitiesResponse,
    GetAllActivitiesResponse,
    GetActivitiesByDateRangeResponse,
    GetActivityStatsResponse,
    CleanOldLogsResponse,
} from '../types/activity-log.types';

// Get user activities (SuperAdmin only)
export const getUserActivities = async (userId: number): Promise<ActivityLog[]> => {
    const response = await api.request<GetUserActivitiesResponse>({
        method: METHODS.GET,
        url: `/api/activity-logs/user/${userId}`,
    });
    return response.data.data;
};

// Get all activities with optional filtering
export const getAllActivities = async (params?: {
    action?: string;
    limit?: number;
    offset?: number;
}): Promise<ActivityLog[]> => {
    const queryParams = new URLSearchParams();
    if (params?.action) queryParams.append('action', params.action);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());

    const response = await api.request<GetAllActivitiesResponse>({
        method: METHODS.GET,
        url: `/api/activity-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`,
    });
    return response.data.data;
};

// Get activities by date range
export const getActivitiesByDateRange = async (
    startDate: string,
    endDate: string
): Promise<ActivityLog[]> => {
    const response = await api.request<GetActivitiesByDateRangeResponse>({
        method: METHODS.GET,
        url: `/api/activity-logs/date-range?start_date=${startDate}&end_date=${endDate}`,
    });
    return response.data.data;
};

// Get activity statistics
export const getActivityStats = async () => {
    const response = await api.request<GetActivityStatsResponse>({
        method: METHODS.GET,
        url: '/api/activity-logs/stats',
    });
    return response.data.data;
};

// Clean old logs (SuperAdmin only)
export const cleanOldLogs = async (daysOld: number) => {
    const response = await api.request<CleanOldLogsResponse>({
        method: METHODS.DELETE,
        url: `/api/activity-logs/clean?days_old=${daysOld}`,
    });
    return response.data.data;
};
