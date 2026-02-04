'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar'; // Tambahkan import Sidebar
import { menuService } from './services/menu.service';
import { Menu } from './types/menu.type';
import Button from '@/components/atoms/button';
import { showSuccess, showError } from '@/hook/useToast';

export default function MenuPage() {
    const router = useRouter();
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false); // Tambahkan state untuk cek apakah komponen sudah mounted di client
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setMounted(true); // Set mounted true setelah komponen mount di client
    }, []);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await menuService.getAllMenu();
                setMenus(data);
            } catch (error) {
                console.error('Failed to fetch menus:', error);
            } finally {
                setLoading(false);
            }
        };
        if (mounted) { // Hanya fetch jika sudah mounted
            fetchMenus();
        }
    }, [mounted]);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(0);
    };

    const handleAdd = () => {
        router.push('/admin-dashboard/menu/create');
    };

    const handleEdit = (id: number) => {
        router.push(`/admin-dashboard/menu/create/${id}`);
    };

    const handleDelete = async (id: number) => {
        const confirmed = window.confirm('Hapus menu ini? Aksi ini tidak dapat dibatalkan.');
        if (!confirmed) return;

        try {
            await menuService.deleteMenu(id);
            setMenus(prev => prev.filter(m => m.id !== id));
            showSuccess('Menu berhasil dihapus');
        } catch (err) {
            console.error('Failed to delete menu:', err);
            showError('Gagal menghapus menu');
        }
    };

    const filteredMenus = menus.filter(menu =>
        menu.nama_makanan?.toLowerCase().includes(search.toLowerCase()) // Ubah nama_produk ke nama_makanan
    );

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

    const columns = [
        { id: 'id', label: 'ID', minWidth: 50 },
        { id: 'nama_makanan', label: 'Nama Makanan', minWidth: 170 },
        { id: 'harga', label: 'Harga', minWidth: 100, align: 'right' as const, format: (value: number) => `Rp ${value.toLocaleString()}` },
        { id: 'stock', label: 'Stock', minWidth: 100, align: 'right' as const },
        { 
            id: 'foto', 
            label: 'Foto', 
            minWidth: 100, 
            format: (value: string) => value ? (
                <img 
                    src={`${BASE_URL}/${value}`} 
                    alt="Foto Menu" 
                    width={50} 
                    height={50} 
                    style={{ objectFit: 'cover', borderRadius: '4px' }} 
                />
            ) : '-'
        },
        {
            id: 'actions',
            label: '',
            minWidth: 140,
            align: 'right' as const,
            format: (_: unknown, row?: Record<string, unknown>) => {
                const id = row?.id as number | undefined;
                return (
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (id) handleEdit(id);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (id) handleDelete(id);
                            }}
                        >
                            Hapus
                        </Button>
                    </Box>
                );
            }
        },
    ];

    if (!mounted || loading) { // Render loading jika belum mounted atau masih loading
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ display: 'flex' }}> {/* Bungkus dengan Box untuk layout flex */}
            <Sidebar role="admin_stan" /> {/* Tambahkan Sidebar dengan role admin_stan */}
            <Box sx={{ flexGrow: 1, p: 3 }}> {/* Konten utama dengan padding */}
                <Typography variant="h4" gutterBottom>
                    Menu Management
                </Typography>
                <DataTable
                    title="Menu List"
                    columns={columns}
                    rows={filteredMenus as unknown as Record<string, unknown>[]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onSearch={handleSearch}
                    onAdd={handleAdd}
                    addButtonLabel="Add Menu"
                />
            </Box>
        </Box>
    );
}