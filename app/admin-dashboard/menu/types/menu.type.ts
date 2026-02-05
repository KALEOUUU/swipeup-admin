export interface Menu {
    id: number;
    nama_makanan: string;
    harga: number;
    jenis: string;
    stock: number;
    foto: string;
    id_stan: number;
    deskripsi?: string;
    is_available?: boolean;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    stan?: {
        id: number;
        nama_stan: string;
        nama_pemilik: string;
        telp: string;
        foto: string;
        qris_image: string;
        accept_cash: boolean;
        accept_qris: boolean;
        id_user: number;
        CreatedAt: string;
        UpdatedAt: string;
        DeletedAt: string | null;
        user: {
            id: number;
            username: string;
            role: string;
            CreatedAt: string;
            UpdatedAt: string;
            DeletedAt: string | null;
        };
    };
}

export interface MenuResponse {
    success: boolean;
    message: string;
    data: Menu[];
}

export interface CreateMenuInput {
    nama_makanan: string;
    harga: number;
    jenis: string;
    deskripsi: string;
    stock: number;
    foto: string; // Base64 string
    id_stan: number;
}

export interface CreateMenuResponse {
    success: boolean;
    message: string;
    data: Menu;
}

export interface UpdateMenuInput {
    nama_makanan?: string;
    harga?: number;
    jenis?: string;
    deskripsi?: string;
    stock?: number;
    foto?: string; // Base64 string or URL
}

export interface UpdateMenuResponse {
    success: boolean;
    message: string;
    data: Menu;
}

export interface GetMenuResponse {
    success: boolean;
    message: string;
    data: Menu;
}

export interface GetMenusByStanResponse {
    success: boolean;
    data: Menu[];
}