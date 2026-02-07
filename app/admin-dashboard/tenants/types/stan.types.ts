// Stan (Tenant) Types

export interface Stan {
    id: number;
    nama_stan: string;
    nama_pemilik: string;
    telp: string;
    foto: string;
    qris_image?: string;
    accept_cash?: boolean;
    accept_qris?: boolean;
    id_user: number;
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

export interface CreateStanInput {
    nama_stan: string;
    nama_pemilik: string;
    telp: string;
    id_user: number;
    foto: string; // Base64 string or URL
    qris_image?: string;
    accept_cash?: boolean;
    accept_qris?: boolean;
}

export interface UpdateStanInput {
    nama_stan?: string;
    nama_pemilik?: string;
    telp?: string;
    foto?: string; // Base64 string or URL
    qris_image?: string;
    accept_cash?: boolean;
    accept_qris?: boolean;
}

export interface StanResponse {
    success: boolean;
    message: string;
    data: Stan;
}

export interface GetAllStanResponse {
    success: boolean;
    message: string;
    data: Stan[];
}
