'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllStan } from '../services/stan.service';
import { Stan } from '../types/stan.types';
import { showError } from '@/hook/useToast';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function StanPage() {
    const router = useRouter();
    const [stans, setStans] = useState<Stan[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchStans = async () => {
            try {
                const data = await getAllStan();
                setStans(data);
            } catch (error) {
                console.error('Failed to fetch stans:', error);
                showError('Failed to fetch stans');
            } finally {
                setLoading(false);
            }
        };

        fetchStans();
    }, []);

    const columns: Column[] = [
        {
            id: 'foto',
            label: 'Foto',
            minWidth: 80,
            format: (value) => (
                <Avatar src={value as string} alt="Stan" sx={{ width: 50, height: 50 }} />
            ),
        },
        { id: 'nama_stan', label: 'Nama Stan', minWidth: 170 },
        { id: 'nama_pemilik', label: 'Nama Pemilik', minWidth: 150 },
        { id: 'telp', label: 'Telepon', minWidth: 130 },
        {
            id: 'payment_methods',
            label: 'Metode Pembayaran',
            minWidth: 150,
            format: (value, row) => {
                const stan = row as unknown as Stan;
                return (
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {stan.accept_cash && <Chip label="Cash" size="small" color="success" />}
                        {stan.accept_qris && <Chip label="QRIS" size="small" color="primary" />}
                    </Box>
                );
            },
        },
        {
            id: 'actions',
            label: 'Aksi',
            minWidth: 150,
            format: (value, row) => {
                const stan = row as unknown as Stan;
                return (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push(`/admin-dashboard/tenants/stan/${stan.id}`)}
                    >
                        Detail
                    </Button>
                );
            },
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
                <Sidebar role="superadmin" />
                <Box sx={{ flexGrow: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Loading...</Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
            <Sidebar role="superadmin" />
            <Box sx={{ flexGrow: 1, p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">
                            Stan Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kelola data stan/tenant di kantin
                        </Typography>
                    </Box>
                </Box>

                <DataTable
                    title="Daftar Stan"
                    columns={columns}
                    rows={stans as unknown as Record<string, unknown>[]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>
        </Box>
    );
}
