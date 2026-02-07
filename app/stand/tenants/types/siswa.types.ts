// Siswa (Student) Types

export interface Siswa {
    id: number;
    nama_siswa: string;
    alamat: string;
    telp: string;
    foto: string;
    id_user: number;
    saldo?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    user?: {
        id: number;
        username: string;
        role: string;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
    };
}

export interface CreateSiswaInput {
    nama_siswa: string;
    alamat: string;
    telp: string;
    id_user: number;
    foto: string; // Base64 string or URL
}

export interface UpdateSiswaInput {
    nama_siswa?: string;
    alamat?: string;
    telp?: string;
    foto?: string; // Base64 string or URL
}

export interface SiswaResponse {
    success: boolean;
    message: string;
    data: Siswa;
}

export interface GetAllSiswaResponse {
    success: boolean;
    message: string;
    data: Siswa[];
}
