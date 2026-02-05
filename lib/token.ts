import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  role: string;
  user_id?: number;
  stan_id?: number;
  id_stan?: number;
  username?: string;
  exp?: number;
  iat?: number;
  // Tambahkan field lain dari token jika diperlukan
  [key: string]: unknown;
}

// Fungsi untuk decode token dan mendapatkan role
export const getRoleFromToken = (token: string): string | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan token dari localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Fungsi untuk menyimpan token
export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

// Fungsi untuk menghapus token
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('stanId');
  }
};

// Fungsi untuk mendapatkan stan_id dari localStorage
export const getStanId = (): number | null => {
  if (typeof window !== 'undefined') {
    const stanId = localStorage.getItem('stanId');
    return stanId ? parseInt(stanId, 10) : null;
  }
  return null;
};

// Fungsi untuk menyimpan stan_id
export const setStanId = (stanId: number): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stanId', stanId.toString());
  }
};

// Fungsi untuk decode token dan mendapatkan stan_id
// NOTE: Token saat ini tidak memiliki stan_id, perlu update backend
// Sementara menggunakan hardcode atau fetch dari API terpisah
export const getStanIdFromToken = (token: string): number | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log('Decoded token:', decoded);
    // Coba beberapa kemungkinan field name
    const stanId = decoded.stan_id || decoded.id_stan || null;
    return stanId ? Number(stanId) : null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Fungsi untuk mendapatkan user_id dari token
export const getUserIdFromToken = (token: string): number | null => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.user_id ? Number(decoded.user_id) : null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};