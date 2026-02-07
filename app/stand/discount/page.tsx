'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layouts/sidebar';
import DataTable from '@/components/layouts/data-table';
import { getAllDiskon, getDiskonByStan } from './service/diskon.service';
import { getStanId, getToken, getRoleFromToken } from '@/lib/token';
import { Diskon } from './types/diskon.types';
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
  const [discounts, setDiscounts] = useState<Diskon[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const role = getRoleFromToken(getToken() ?? '') as 'superadmin' | 'admin_stan';

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = getToken();
        if (!token) {
          router.push('/account/login');
          return;
        }

        let data: Diskon[];

        if (role === 'superadmin') {
          // SuperAdmin can see all discounts
          data = await getAllDiskon();
        } else {
          // Admin Stan can only see their stan's discounts
          const stanId = getStanId();
          if (!stanId) {
            showError('Stan ID not found. Please relogin.');
            setLoading(false);
            return;
          }
          data = await getDiskonByStan(stanId);
        }

        setDiscounts(data);
      } catch (error) {
        console.error('Failed to fetch discounts:', error);
        showError('Failed to fetch discounts');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, [router, role]);

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
      id: 'tipe_diskon',
      label: 'Tipe',
      minWidth: 100,
      format: (value: unknown) => {
        const v = String(value);
        return (
          <Chip
            label={v}
            color={v === 'global' ? 'primary' : v === 'stan' ? 'secondary' : 'default'}
            size="small"
          />
        );
      },
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
        const diskon = row as unknown as Diskon;
        const now = new Date();
        const start = diskon?.tanggal_awal ? new Date(diskon.tanggal_awal) : null;
        const end = diskon?.tanggal_akhir ? new Date(diskon.tanggal_akhir) : null;
        if (!start || !end) {
          return <Chip label="Tidak tersedia" color="default" size="small" />;
        }
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
      format: (value, row) => {
        const diskon = row as unknown as Diskon;
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => (diskon?.id ? router.push(`/admin-dashboard/discount/${diskon.id}`) : undefined)}
          >
            Detail
          </Button>
        );
      },
    },
  ];

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

        <DataTable
          title="Daftar Diskon"
          columns={columns}
          rows={discounts as unknown as Record<string, unknown>[]}
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
