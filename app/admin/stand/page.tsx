'use client';

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation'; // Tambahkan import useRouter
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllStandCanteens, deleteStandCanteen } from './services/stand.service';
import { StandCanteen } from './types/stand.types';
import { showSuccess, showError } from '@/hook/useToast';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function StandCanteensPage() {
  const router = useRouter(); // Inisialisasi router
  const [standCanteens, setStandCanteens] = useState<StandCanteen[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch stand canteens on mount
  useEffect(() => {
    const fetchStandCanteens = async () => {
      try {
        const data = await getAllStandCanteens();
        setStandCanteens(data);
      } catch (error) {
        showError('Failed to fetch stand canteens');
      } finally {
        setLoading(false);
      }
    };
    fetchStandCanteens();
  }, []);

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this stand canteen?')) {
      try {
        await deleteStandCanteen(id);
        setStandCanteens(standCanteens.filter((sc) => sc.id !== id));
        showSuccess('Stand canteen deleted successfully');
      } catch (error) {
        showError('Failed to delete stand canteen');
      }
    }
  };

  // Handle update
  const handleUpdate = (id: number) => {
    router.push(`/admin/stand/create/${id}`);
  };

  // Handle page change
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Handle add
  const handleAdd = () => {
    router.push('/admin/stand/create');
  };

  // Define columns for DataTable
  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
    { id: 'store_name', label: 'Store Name', minWidth: 200 },
    { id: 'stand.name', label: 'Stand Admin', minWidth: 150, format: (value, row) => (row as StandCanteen).stand?.name || 'N/A' },
    {
      id: 'is_active',
      label: 'Active',
      minWidth: 100,
      align: 'center',
      format: (value: unknown) => (value ? 'Yes' : 'No'),
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 150,
      align: 'center',
      format: (value: unknown, row?: Record<string, unknown>) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleUpdate((row as StandCanteen).id)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete((row as StandCanteen).id)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Manage Stand Canteens
        </Typography>
        <DataTable
          title="Stand Canteens"
          columns={columns}
          rows={standCanteens}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onAdd={handleAdd}
          addButtonLabel="Add Stand Canteen"
        />
      </Box>
    </Box>
  );
}
