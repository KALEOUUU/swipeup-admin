// Diskon (Discount) Types

export interface Diskon {
    id: number;
    nama_diskon: string;
    persentase_diskon: number;
    tanggal_awal: string;
    tanggal_akhir: string;
    tipe_diskon: 'global' | 'stan' | 'menu';
    id_stan?: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    stan?: {
        id: number;
        nama_stan: string;
        nama_pemilik: string;
        telp: string;
        foto: string;
    };
    diskon_menus?: DiskonMenu[];
    diskon_stans?: DiskonStan[];
}

export interface DiskonMenu {
    id: number;
    id_diskon: number;
    id_menu: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    menu?: {
        id: number;
        nama_makanan: string;
        harga: number;
        jenis: string;
        foto: string;
    };
}

export interface DiskonStan {
    id: number;
    id_diskon: number;
    id_stan: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    stan?: {
        id: number;
        nama_stan: string;
        nama_pemilik: string;
    };
}

export interface CreateDiskonInput {
    nama_diskon: string;
    persentase_diskon: number;
    tanggal_awal: string; // RFC3339 format
    tanggal_akhir: string; // RFC3339 format
    tipe_diskon: 'global' | 'stan' | 'menu';
    id_stan?: number; // Required for 'stan' or 'menu' type
    id_menu?: number[]; // Required for 'menu' type
}

export interface UpdateDiskonInput {
    nama_diskon?: string;
    persentase_diskon?: number;
    tanggal_awal?: string;
    tanggal_akhir?: string;
}

export interface CreateDiskonStanInput {
    id_diskon: number;
    id_stan: number;
}

export interface CreateDiskonMenuInput {
    id_diskon: number;
    id_menu: number;
}

export interface DiskonResponse {
    success: boolean;
    message: string;
    data: Diskon;
}

export interface GetAllDiskonResponse {
    success: boolean;
    message: string;
    data: Diskon[];
}

export interface GetDiskonByStanResponse {
    success: boolean;
    message: string;
    data: Diskon[];
}

export interface GetActiveDiskonResponse {
    success: boolean;
    message: string;
    data: Diskon[];
}
