# SwipeUp Admin Frontend

Frontend dashboard untuk admin stan dalam aplikasi SwipeUp, dibangun dengan Next.js, MUI, React Query, dan Axios.

## Fitur

- **Authentication**: Login dan register untuk admin stan
- **Dashboard**: Overview dengan statistik dasar
- **Manage Stan**: View dan edit informasi stan
- **Manage Menu**: CRUD operasi untuk menu makanan/minuman
- **Manage Diskon**: CRUD operasi untuk diskon stan dan global
- **View Transaksi**: Melihat dan update status transaksi
- **Activity Logs**: Melihat log aktivitas dengan filter tanggal

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Styling**: MUI Theme + Tailwind CSS (minimal)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup environment variables di `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka http://localhost:3000 di browser

## Struktur API

Frontend ini terintegrasi dengan backend Go yang menyediakan endpoint berikut:

### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/auth/profile` - Get profile

### Stan
- `GET /api/stan/by-user?user_id={id}` - Get stan by user
- `POST /api/stan` - Create stan
- `PUT /api/stan/{id}` - Update stan

### Menu
- `GET /api/menu/by-stan?id_stan={id}` - Get menu by stan
- `POST /api/menu` - Create menu
- `PUT /api/menu/{id}` - Update menu
- `DELETE /api/menu/{id}` - Delete menu

### Diskon
- `GET /api/diskon/by-stan?id_stan={id}` - Get diskon by stan
- `GET /api/diskon/global` - Get global diskon
- `POST /api/diskon` - Create diskon
- `PUT /api/diskon/{id}` - Update diskon
- `DELETE /api/diskon/{id}` - Delete diskon

### Transaksi
- `GET /api/transaksi/by-stan?id_stan={id}` - Get transaksi by stan
- `PUT /api/transaksi/{id}/status` - Update status transaksi

### Activity Logs
- `GET /api/activity-logs` - Get activity logs dengan filter

## Cara Penggunaan

1. **Register**: Buat akun admin stan di `/register`
2. **Login**: Masuk dengan username dan password di `/login`
3. **Dashboard**: Akses dashboard utama setelah login
4. **Manage Stan**: Setup atau edit informasi stan
5. **Manage Menu**: Tambah, edit, hapus menu makanan/minuman
6. **Manage Diskon**: Buat diskon untuk stan atau global
7. **View Transaksi**: Lihat transaksi siswa dan update status
8. **Activity Logs**: Monitor aktivitas dengan filter tanggal

## Notes

- Semua operasi CRUD menggunakan React Query untuk caching dan state management
- Forms menggunakan React Hook Form dengan validasi
- UI responsive dengan MUI components
- Authentication menggunakan JWT token disimpan di localStorage
- Image upload mendukung base64 encoding sesuai API backend
