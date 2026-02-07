// User Management Types (SuperAdmin)

export interface User {
    id: number;
    username: string;
    role: 'superadmin' | 'admin_stan' | 'siswa';
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
}

export interface CreateUserInput {
    username: string;
    password: string;
    role: 'superadmin' | 'admin_stan' | 'siswa';
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface GetAllUsersResponse {
    success: boolean;
    message: string;
    data: User[];
}
