// Transaksi (Transaction) Types

export interface TransaksiDetail {
    id: number;
    id_transaksi: number;
    id_menu: number;
    qty: number;
    harga_beli: number;
    CreatedAt?: string;
    UpdatedAt?: string;
    DeletedAt?: string | null;
    menu?: {
        id: number;
        nama_makanan: string;
        harga: number;
        jenis: string;
        foto: string;
        id_stan: number;
    };
}

export interface Transaksi {
    id: number;
    id_stan: number;
    id_siswa: number;
    total_harga: number;
    status: 'pending' | 'completed' | 'cancelled';
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
    siswa?: {
        id: number;
        nama_siswa: string;
        alamat: string;
        telp: string;
        foto: string;
        saldo: number;
    };
    details?: TransaksiDetail[];
}

export interface CreateTransaksiDetailInput {
    id_menu: number;
    qty: number;
    harga_beli: number;
}

export interface CreateTransaksiInput {
    id_stan: number;
    id_siswa: number;
    details: CreateTransaksiDetailInput[];
}

export interface UpdateTransaksiStatusInput {
    status: 'pending' | 'completed' | 'cancelled';
}

export interface TransaksiResponse {
    success: boolean;
    message: string;
    data: Transaksi;
}

export interface GetAllTransaksiResponse {
    success: boolean;
    message: string;
    data: Transaksi[];
}

export interface GetTransaksiBySiswaResponse {
    success: boolean;
    message: string;
    data: Transaksi[];
}
