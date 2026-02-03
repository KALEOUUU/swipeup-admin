export interface LoginFormData {
  username: string;
  password: string;
}

// Tambahkan types untuk register stan
export interface RegisterStanRequest {
  username: string;
  password: string;
  nama_stan: string;
  nama_pemilik: string;
  telp: string;
}