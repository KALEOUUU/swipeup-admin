'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getMenusByStan } from './services/menu.service.ts';
import { Menu } from './types/menu.types';
import { getStanId, getRoleFromToken } from '@/lib/token';
import { showError } from '@/hook/useToast';

export default function MenuPage() {
  const router = useRouter();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const role = getRoleFromToken() as 'superadmin' | 'admin_stan';

  useEffect(() => {
    const fetchMenus = async () => {
      const stanId = getStanId();
      console.log('Stan ID from localStorage:', stanId);

      if (!stanId) {
        showError('Stan ID not found. Please login again.');
        return;
      }

      try {
        const response = await getMenusByStan(stanId);
        if (response.success) {
          setMenus(response.data);
        } else {
          showError('Failed to fetch menus');
        }
      } catch (error) {
        console.error('Failed to fetch menus:', error);
        showError('Failed to fetch menus');
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  const columns = [
    { id: 'nama_makanan', label: 'Nama Makanan', minWidth: 170 },
    { id: 'harga', label: 'Harga', minWidth: 100, format: (value: number) => `Rp ${value.toLocaleString()}` },
    { id: 'jenis', label: 'Jenis', minWidth: 100 },
    { id: 'stock', label: 'Stock', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      format: (value: unknown, row: Menu) => (
        <Chip
          label={row.stock > 0 ? 'Tersedia' : 'Habis'}
          color={row.stock > 0 ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      id: 'actions',
      label: 'Aksi',
      minWidth: 150,
      format: (value: unknown, row: Menu) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/admin-dashboard/menu/${row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAdd = () => {
    router.push('/admin-dashboard/menu/create');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Sidebar role={role} />
        <Box sx={{ flexGrow: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Sidebar role={role} />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Menu Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kelola menu makanan di stan Anda
            </Typography>
          </Box>
        </Box>

        {/* Data Table */}
        <DataTable
          title="Daftar Menu"
          columns={columns}
          rows={menus}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onAdd={handleAdd}
          addButtonLabel="Tambah Menu"
        />
      </Box>
    </Box>
  );
}