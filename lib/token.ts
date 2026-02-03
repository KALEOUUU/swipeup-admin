import jwtDecode from 'jwt-decode';

export interface DecodedToken {
  role: string;
  // Tambahkan field lain dari token jika diperlukan
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
  }
};

// Fungsi untuk check apakah token valid (opsional, bisa tambahkan expiry check)
export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    // Tambahkan logic untuk check expiry jika ada
    return true; // Placeholder
  } catch {
    return false;
  }
};