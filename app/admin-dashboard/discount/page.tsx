'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layouts/sidebar';
import DataTable from '@/components/layouts/data-table';
import { getDiscountsByStan } from './service/discount.service';
import { getStanId, getToken } from '@/lib/token';
import { Discount } from './types/discount.types';
import { showError } from '@/hook/useToast';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function DiscountPage() {
  const router = useRouter();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push('/account/login');
          return;
        }
        
        const stanId = getStanId();
        console.log('Stan ID from localStorage:', stanId);

        if (!stanId) {
          console.error('Stan ID not found in localStorage');
          showError('Stan ID not found. Please relogin.');
          setLoading(false);
          return;
        }

        const response = await getDiscountsByStan(stanId);
        if (response.success) {
            setDiscounts(response.data);
        } else {
            showError('Failed to fetch discounts');
        }
      } catch (error) {
        console.error('Failed to fetch discounts:', error);
        showError('Failed to fetch discounts');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, [router]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddDiscount = () => {
    router.push('/admin-dashboard/discount/create');
  };

  const columns: Column[] = [
    {
      id: 'nama_diskon',
      label: 'Nama Diskon',
      minWidth: 200,
    },
    {
      id: 'persentase_diskon',
      label: 'Persentase (%)',
      minWidth: 120,
      align: 'center',
      format: (value) => `${value}%`,
    },
    {
      id: 'tanggal_awal',
      label: 'Tanggal Awal',
      minWidth: 120,
      format: (value) => new Date(value as string).toLocaleDateString('id-ID'),
    },
    {
      id: 'tanggal_akhir',
      label: 'Tanggal Akhir',
      minWidth: 120,
      format: (value) => new Date(value as string).toLocaleDateString('id-ID'),
    },
    {
      id: 'status',
      label: 'Status',
      minWidth: 100,
      align: 'center',
      format: (value, row) => {
        const now = new Date();
        const start = new Date(row.tanggal_awal as string);
        const end = new Date(row.tanggal_akhir as string);
        if (now < start) {
          return <Chip label="Belum Aktif" color="default" size="small" />;
        } else if (now > end) {
          return <Chip label="Kadaluarsa" color="error" size="small" />;
        } else {
          return <Chip label="Aktif" color="success" size="small" />;
        }
      },
    },
    {
      id: 'actions',
      label: 'Aksi',
      minWidth: 100,
      align: 'center',
      format: (value, row) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => router.push(`/admin-dashboard/discount/${row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Sidebar role="admin_stan" />
        <Box sx={{ flexGrow: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography>Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Sidebar role="admin_stan" />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Discount Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kelola diskon untuk stan Anda
            </Typography>
          </Box>
        </Box>

        {/* Data Table */}
        <DataTable
          title="Daftar Diskon"
          columns={columns}
          rows={discounts}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onAdd={handleAddDiscount}
          addButtonLabel="Tambah Diskon"
        />
      </Box>
    </Box>
  );
}
