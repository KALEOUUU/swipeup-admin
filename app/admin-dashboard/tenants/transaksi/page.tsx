'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllTransaksi } from '../services/transaksi.service';
import { Transaksi } from '../types/transaksi.types';
import { getRoleFromToken } from '@/lib/token';
import { showError } from '@/hook/useToast';

export default function TransaksiPage() {
    const router = useRouter();
    const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const role = getRoleFromToken() as 'superadmin' | 'admin_stan';

    useEffect(() => {
        const fetchTransaksi = async () => {
            try {
                const data = await getAllTransaksi();
                setTransaksi(data);
            } catch (error) {
                console.error('Failed to fetch transaksi:', error);
                showError('Failed to fetch transactions');
            } finally {
                setLoading(false);
            }
        };

        fetchTransaksi();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'success';
            case 'pending':
                return 'warning';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    const columns = [
        { id: 'id', label: 'ID Transaksi', minWidth: 100 },
        {
            id: 'siswa',
            label: 'Nama Siswa',
            minWidth: 150,
            format: (value: unknown, row: Transaksi) => row.siswa?.nama_siswa || '-',
        },
        {
            id: 'stan',
            label: 'Nama Stan',
            minWidth: 150,
            format: (value: unknown, row: Transaksi) => row.stan?.nama_stan || '-',
        },
        {
            id: 'total_harga',
            label: 'Total Harga',
            minWidth: 130,
            format: (value: number) => `Rp ${value.toLocaleString()}`,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 120,
            format: (value: string) => (
                <Chip label={value} color={getStatusColor(value)} size="small" />
            ),
        },
        {
            id: 'CreatedAt',
            label: 'Tanggal',
            minWidth: 150,
            format: (value: string) => new Date(value).toLocaleDateString('id-ID'),
        },
        {
            id: 'actions',
            label: 'Aksi',
            minWidth: 150,
            format: (value: unknown, row: Transaksi) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => router.push(`/admin-dashboard/tenants/transaksi/${row.id}`)}
                >
                    Detail
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
                            Transaction Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kelola transaksi pembelian siswa
                        </Typography>
                    </Box>
                </Box>

                <DataTable
                    title="Daftar Transaksi"
                    columns={columns}
                    rows={transaksi}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>
        </Box>
    );
}
