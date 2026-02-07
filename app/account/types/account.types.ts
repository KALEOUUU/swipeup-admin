export interface LoginFormData {
  username: string;
  password: string;
}

// Tambahkan types untuk register
export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  rfid_card: string;
}