// Activity Logs Types (SuperAdmin)

export interface ActivityLog {
    id: number;
    user_id: number;
    action: string;
    details?: string;
    ip_address?: string;
    user_agent?: string;
    CreatedAt?: string;
    user?: {
        id: number;
        username: string;
        role: string;
    };
}

export interface GetUserActivitiesResponse {
    success: boolean;
    message: string;
    data: ActivityLog[];
}

export interface GetAllActivitiesResponse {
    success: boolean;
    message: string;
    data: ActivityLog[];
}

export interface GetActivitiesByDateRangeResponse {
    success: boolean;
    message: string;
    data: ActivityLog[];
}

export interface ActivityStats {
    total_activities: number;
    activities_by_action: Record<string, number>;
    activities_by_user: Record<string, number>;
}

export interface GetActivityStatsResponse {
    success: boolean;
    message: string;
    data: ActivityStats;
}

export interface CleanOldLogsResponse {
    success: boolean;
    message: string;
    data: {
        deleted_count: number;
    };
}
