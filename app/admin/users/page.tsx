'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllUsers } from '../services/user.service';
import { User } from '../types/user.types';
import { showError } from '@/hook/useToast';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function UsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                showError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'superadmin':
                return 'error';
            case 'admin_stan':
                return 'primary';
            case 'siswa':
                return 'success';
            default:
                return 'default';
        }
    };

    const columns: Column[] = [
        { id: 'id', label: 'ID', minWidth: 70 },
        { id: 'username', label: 'Username', minWidth: 170 },
        {
            id: 'role',
            label: 'Role',
            minWidth: 130,
            format: (value) => (
                <Chip label={value as string} color={getRoleColor(value as string)} size="small" />
            ),
        },
        {
            id: 'CreatedAt',
            label: 'Tanggal Dibuat',
            minWidth: 150,
            format: (value) => new Date(value as string).toLocaleDateString('id-ID'),
        },
        {
            id: 'actions',
            label: 'Aksi',
            minWidth: 150,
            format: (value, row) => {
                const user = row as unknown as User;
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => router.push(`/superadmin-dashboard/users/${user.id}`)}
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
        router.push('/superadmin-dashboard/users/create');
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
                            User Management
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Kelola pengguna sistem
                        </Typography>
                    </Box>
                </Box>

                <DataTable
                    title="Daftar Pengguna"
                    columns={columns}
                    rows={users as unknown as Record<string, unknown>[]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onAdd={handleAdd}
                    addButtonLabel="Tambah Pengguna"
                />
            </Box>
        </Box>
    );
}
