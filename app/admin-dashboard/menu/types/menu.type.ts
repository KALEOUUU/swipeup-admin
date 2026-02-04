export interface Menu {
    id: number;
    nama_makanan: string; // Ubah dari nama_produk ke nama_makanan sesuai response API
    harga: number;
    stock: number; // Ubah dari stok ke stock sesuai response API
    jenis?: string; // Tambahkan field opsional lainnya jika diperlukan
    foto?: string;
    deskripsi?: string;
    is_available?: boolean;
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
    message: string; // Tambahkan message sesuai response
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