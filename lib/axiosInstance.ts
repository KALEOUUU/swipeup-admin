import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Buat instance Axios kustom
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1', // Diubah ke 8080 sesuai dokumentasi
  timeout: 10000, // Timeout 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk Request: Tambahkan token auth jika ada
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Ambil token dari localStorage atau cookies (sesuaikan dengan implementasi auth Anda)
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Logging request (opsional)
    console.log('Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor untuk Response: Handle error global
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Logging response (opsional)
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Token expired atau unauthorized: Redirect ke login atau refresh token
        console.warn('Unauthorized: Redirecting to login');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken'); // Hapus token
          window.location.href = '/account/login'; // Redirect ke login
        }
      } else if (status === 403) {
        console.error('Forbidden: Access denied');
      } else if (status >= 500) {
        console.error('Server Error:', error.response.data);
      }
    } else if (error.request) {
      console.error('Network Error: No response received');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;