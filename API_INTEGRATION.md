# Swipeup Admin - API Integration Documentation

## Overview
This document provides comprehensive information about the backend API integrations implemented in the Swipeup Admin application. All integrations follow the established patterns and conventions found in the existing codebase.

## Architecture Pattern

### Service Layer Pattern
All API calls are organized using a service layer pattern:
```
app/
  [feature]/
    services/
      [feature].service.ts    # API service functions
    types/
      [feature].types.ts      # TypeScript interfaces
    page.tsx                  # UI components
```

### API Configuration
- **Base URL**: `http://localhost:8080/` (configured in `/lib/api.ts`)
- **Authentication**: Bearer token (automatically added via axios interceptor)
- **Token Storage**: localStorage (`authToken`, `stanId`)

## Implemented Features

### 1. Admin Stan Features

#### Menu Management (`/app/admin-dashboard/menu/`)
**Endpoints:**
- `GET /api/admin-stan/menu` - Get all menus for authenticated admin stan
- `GET /api/menu/available` - Get available menus
- `GET /api/menu/{id}` - Get menu by ID
- `GET /api/public/menu/by-stan?stan_id={id}` - Get menus by stan ID
- `GET /api/menu/search?name={name}` - Search menu by name
- `POST /api/admin-stan/menu` - Create new menu
- `PUT /api/admin-stan/menu/{id}` - Update menu
- `PUT /api/admin-stan/menu/{id}/stock` - Update menu stock
- `PUT /api/admin-stan/menu/{id}/adjust-stock` - Adjust stock (increment/decrement)
- `DELETE /api/admin-stan/menu/{id}` - Delete menu

**Key Types:**
```typescript
interface Menu {
  id: number;
  nama_makanan: string;
  harga: number;
  jenis: string;
  stock: number;
  foto: string; // Base64 or URL
  id_stan: number;
  deskripsi?: string;
}

interface CreateMenuInput {
  nama_makanan: string;
  harga: number;
  jenis: string;
  deskripsi: string;
  stock: number;
  foto: string; // Base64 string
  // id_stan is automatically set from authenticated user
}
```

**Page:** `/app/admin-dashboard/menu/page.tsx`

#### Stan (Tenant) Management (`/app/admin-dashboard/tenants/`)
**Endpoints:**
- `GET /api/superadmin/stan` - Get all stan (SuperAdmin only)
- `GET /api/stan/{id}` - Get stan by ID
- `GET /api/stan/user/{userId}` - Get stan by user ID
- `POST /api/admin-stan/stan/profile` - Create stan profile
- `PUT /api/admin-stan/stan/{id}` - Update stan profile
- `DELETE /api/superadmin/stan/{id}` - Delete stan (SuperAdmin only)

**Key Types:**
```typescript
interface Stan {
  id: number;
  nama_stan: string;
  nama_pemilik: string;
  telp: string;
  foto: string; // Base64 or URL
  qris_image?: string;
  accept_cash?: boolean;
  accept_qris?: boolean;
  id_user: number;
}
```

**Page:** `/app/admin-dashboard/tenants/stan/page.tsx`

#### Siswa (Student) Management (`/app/admin-dashboard/tenants/`)
**Endpoints:**
- `GET /api/siswa` - Get all siswa
- `GET /api/siswa/{id}` - Get siswa by ID
- `GET /api/siswa/user/{userId}` - Get siswa by user ID
- `POST /api/siswa` - Create siswa
- `PUT /api/siswa/{id}` - Update siswa
- `DELETE /api/siswa/{id}` - Delete siswa

**Key Types:**
```typescript
interface Siswa {
  id: number;
  nama_siswa: string;
  alamat: string;
  telp: string;
  foto: string; // Base64 or URL
  id_user: number;
  saldo?: number;
}
```

**Page:** `/app/admin-dashboard/tenants/siswa/page.tsx`

#### Transaction Management (`/app/admin-dashboard/tenants/`)
**Endpoints:**
- `GET /api/admin-stan/transactions` - Get all transactions (for authenticated stan)
- `GET /api/transaksi/{id}` - Get transaction by ID
- `GET /api/transaksi/siswa/{siswaId}` - Get transactions by siswa ID
- `POST /api/transaksi` - Create transaction
- `PUT /api/transaksi/{id}/status` - Update transaction status

**Key Types:**
```typescript
interface Transaksi {
  id: number;
  id_stan: number;
  id_siswa: number;
  total_harga: number;
  status: 'pending' | 'completed' | 'cancelled';
  details?: TransaksiDetail[];
}

interface CreateTransaksiInput {
  id_stan: number;
  id_siswa: number;
  details: {
    id_menu: number;
    qty: number;
    harga_beli: number;
  }[];
}
```

**Page:** `/app/admin-dashboard/tenants/transaksi/page.tsx`

#### Discount Management (`/app/admin-dashboard/discount/`)
**Endpoints:**
- `GET /api/diskon` - Get all discounts
- `GET /api/diskon/{id}` - Get discount by ID
- `GET /api/diskon/global` - Get global discounts
- `GET /api/diskon/stan/{stanId}` - Get discounts by stan
- `GET /api/diskon/stan/{stanId}/active` - Get active discounts by stan
- `POST /api/diskon` - Create discount
- `PUT /api/diskon/{id}` - Update discount
- `DELETE /api/diskon/{id}` - Delete discount
- `POST /api/diskon/stan` - Create discount stan link
- `PUT /api/diskon/stan/{id}` - Update discount stan
- `DELETE /api/diskon/stan/{id}` - Delete discount stan
- `POST /api/diskon/menu` - Create discount menu link
- `PUT /api/diskon/menu/{id}` - Update discount menu
- `DELETE /api/diskon/menu/{id}` - Delete discount menu

**Key Types:**
```typescript
interface Diskon {
  id: number;
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string; // RFC3339 format
  tanggal_akhir: string; // RFC3339 format
  tipe_diskon: 'global' | 'stan' | 'menu';
  id_stan?: number;
}

interface CreateDiskonInput {
  nama_diskon: string;
  persentase_diskon: number;
  tanggal_awal: string;
  tanggal_akhir: string;
  tipe_diskon: 'global' | 'stan' | 'menu';
  id_stan?: number; // Required for 'stan' or 'menu' type
  id_menu?: number[]; // Required for 'menu' type
}
```

**Page:** `/app/admin-dashboard/discount/page.tsx`

### 2. SuperAdmin Features

#### User Management (`/app/superadmin-dashboard/users/`)
**Endpoints:**
- `GET /api/superadmin/users` - Get all users
- `GET /api/superadmin/users/{id}` - Get user by ID
- `POST /api/superadmin/users` - Create user
- `DELETE /api/superadmin/users/{id}` - Delete user

**Key Types:**
```typescript
interface User {
  id: number;
  username: string;
  role: 'superadmin' | 'admin_stan' | 'siswa';
}

interface CreateUserInput {
  username: string;
  password: string;
  role: 'superadmin' | 'admin_stan' | 'siswa';
}
```

**Page:** `/app/superadmin-dashboard/users/page.tsx`

#### Activity Logs (`/app/superadmin-dashboard/activity-logs/`)
**Endpoints:**
- `GET /api/activity-logs/user/{userId}` - Get user activities
- `GET /api/activity-logs?action={action}&limit={limit}&offset={offset}` - Get all activities with filters
- `GET /api/activity-logs/date-range?start_date={start}&end_date={end}` - Get activities by date range
- `GET /api/activity-logs/stats` - Get activity statistics
- `DELETE /api/activity-logs/clean?days_old={days}` - Clean old logs

**Key Types:**
```typescript
interface ActivityLog {
  id: number;
  user_id: number;
  action: string;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  CreatedAt?: string;
  user?: {
    id: number;
    username: string;
    role: string;
  };
}
```

**Page:** `/app/superadmin-dashboard/activity-logs/page.tsx`

## Authentication & Authorization

### Token Management (`/lib/token.ts`)
```typescript
// Get token from localStorage
getToken(): string | null

// Get role from token
getRoleFromToken(token?: string): string | null

// Get stan ID from localStorage
getStanId(): number | null

// Get user ID from token
getUserIdFromToken(token: string): number | null

// Set/remove tokens
setToken(token: string): void
removeToken(): void
setStanId(stanId: number): void
```

### Role-Based Access
- **SuperAdmin**: Full access to all features
- **Admin Stan**: Access to their own stan's data (menu, transactions, discounts)
- **Siswa**: Limited access (not implemented in admin panel)

## Image Upload Support

All image fields accept:
1. **Base64 with data URI**: `data:image/png;base64,iVBORw0...`
2. **Base64 without data URI**: `iVBORw0...`
3. **Regular URL**: `https://example.com/image.jpg`

**Supported Formats:**
- PNG
- JPEG/JPG
- GIF
- WebP

**Backend Storage:**
- Images are saved to: `uploads/images/<uuid>.<ext>`
- Accessible via: `http://localhost:8080/uploads/images/<uuid>.<ext>`

## Error Handling

All services use try-catch blocks and show user-friendly error messages via toast notifications:

```typescript
try {
  const data = await serviceFunction();
  // Success handling
} catch (error) {
  console.error('Error:', error);
  showError('User-friendly error message');
}
```

## API Request Pattern

All API requests follow this pattern:

```typescript
import api from '@/lib/api';
import { METHODS } from '@/lib/constant';

export const serviceFunction = async (params): Promise<ReturnType> => {
  const response = await api.request<ResponseType>({
    method: METHODS.GET, // or POST, PUT, DELETE
    url: '/api/endpoint',
    data: requestBody, // for POST/PUT
  });
  return response.data.data; // or response.data
};
```

## UI Components Pattern

All list pages follow this structure:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { serviceFunction } from './services/service';

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await serviceFunction();
        setData(result);
      } catch (error) {
        showError('Error message');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Define columns and handlers
  // Render DataTable component
}
```

## Testing with Bruno

All API endpoints are documented in the `/docs` directory as Bruno collections:
- Admin Stan endpoints: `/docs/admin_stan/`
- SuperAdmin endpoints: `/docs/superadmin/`
- Student endpoints: `/docs/siswa/`

## Next Steps

### Recommended Implementations:
1. **Create/Edit Forms**: Implement form pages for creating and editing records
2. **Detail Pages**: Add detail view pages for each resource
3. **Validation**: Add form validation using the validation files
4. **Search & Filters**: Implement search and filtering on list pages
5. **Pagination**: Enhance pagination with backend support
6. **File Upload UI**: Create image upload components with preview
7. **Error Boundaries**: Add React error boundaries
8. **Loading States**: Improve loading indicators
9. **Confirmation Dialogs**: Add confirmation for delete operations
10. **Dashboard Statistics**: Create dashboard pages with statistics

## Notes

- All services are fully typed with TypeScript interfaces
- API base URL is configurable via environment variable `NEXT_PUBLIC_API_BASE_URL`
- Authentication token is automatically included in all requests via axios interceptor
- 401 responses automatically redirect to login page
- All timestamps use RFC3339 format
- Currency is displayed in Indonesian Rupiah (IDR)
- Date formatting uses Indonesian locale

## File Structure Summary

```
app/
  admin-dashboard/
    discount/
      service/
        diskon.service.ts
      types/
        diskon.types.ts
      page.tsx
    menu/
      services/
        menu.service.ts
      types/
        menu.type.ts
      page.tsx
    tenants/
      services/
        siswa.service.ts
        stan.service.ts
        transaksi.service.ts
      types/
        siswa.types.ts
        stan.types.ts
        transaksi.types.ts
      siswa/
        page.tsx
      stan/
        page.tsx
      transaksi/
        page.tsx
  superadmin-dashboard/
    services/
      activity-log.service.ts
      user.service.ts
    types/
      activity-log.types.ts
      user.types.ts
    activity-logs/
      page.tsx
    users/
      page.tsx
  account/
    services/
      account.service.ts
    types/
      account.types.ts
lib/
  api.ts          # Axios instance configuration
  constant.ts     # HTTP methods constants
  token.ts        # Token management utilities
```

## Support

For API documentation details, refer to:
- `/docs/README.md` - Complete API documentation
- `/docs/DISKON_2_LEVEL.md` - Discount system documentation
- `/docs/README_IMAGE_UPLOAD.md` - Image upload documentation
