export interface Discount {
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  tipe_diskon: string;
  id_stan: number;
}

export interface GetDiscountsByStanResponse {
  success: boolean;
  data: Discount[];
}

export interface CreateDiscountRequest {
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  tipe_diskon: string;
  id_stan: number;
  id_menu: number[];
}

export interface CreateDiscountResponse {
  success: boolean;
  data: Discount;
}

export interface CreateDiscountForStanRequest {
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  tipe_diskon: string;
  id_stan: number;
}

export interface CreateDiscountForStanResponse {
  success: boolean;
  data: Discount;
}

export interface UpdateDiscountRequest {
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
}

export interface UpdateDiscountResponse {
  success: boolean;
  data: Discount;
}