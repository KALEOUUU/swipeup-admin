'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllSiswa } from '../services/siswa.service';
import { Siswa } from '../types/siswa.types';
import { showError } from '@/hook/useToast';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function SiswaPage() {
    const router = useRouter();
    const [siswa, setSiswa] = useState<Siswa[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchSiswa = async () => {
            try {
                const data = await getAllSiswa();
                setSiswa(data);
            } catch (error) {
                console.error('Failed to fetch siswa:', error);
                showError('Failed to fetch siswa');
            } finally {
                setLoading(false);
            }
        };

        fetchSiswa();
    }, []);

    const columns: Column[] = [
        {
            id: 'foto',
            label: 'Foto',
            minWidth: 80,
            format: (value) => (
                <Avatar src={value as string} alt="Siswa" sx={{ width: 50, height: 50 }} />
            ),
        },
        { id: 'nama_siswa', label: 'Nama Siswa', minWidth: 170 },
        { id: 'alamat', label: 'Alamat', minWidth: 200 },
        { id: 'telp', label: 'Telepon', minWidth: 130 },
        {
            id: 'saldo',
            label: 'Saldo',
            minWidth: 120,
            format: (value) => `Rp ${(value as number || 0).toLocaleString()}`,
        },
        {
            id: 'actions',
            label: 'Aksi',
            minWidth: 150,
            format: (value, row) => {
                const siswaRow = row as unknown as Siswa;
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => router.push(`/admin-dashboard/tenants/siswa/${siswaRow.id}`)}
                        >
                            Detail
                        </Button>
                    </Box>
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

    const handleAdd = () => {
        router.push('/admin-dashboard/tenants/siswa/create');
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
                            Siswa Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kelola data siswa
                        </Typography>
                    </Box>
                </Box>

                <DataTable
                    title="Daftar Siswa"
                    columns={columns}
                    rows={siswa as unknown as Record<string, unknown>[]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onAdd={handleAdd}
                    addButtonLabel="Tambah Siswa"
                />
            </Box>
        </Box>
    );
}
