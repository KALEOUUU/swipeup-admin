'use client';

import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import CategoryModal from '@/components/molecules/category-modal';
import { getAllCategories, deleteCategory } from './services/category.service';
import { Category } from './types/category.types';
import { showSuccess, showError } from '@/hook/useToast';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        showError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter((cat) => cat.id !== id));
        showSuccess('Category deleted successfully');
      } catch (error) {
        showError('Failed to delete category');
      }
    }
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
    setModalMode('create');
    setSelectedCategory(null);
    setModalOpen(true);
  };

  // Handle edit
  const handleEdit = (category: Category) => {
    setModalMode('update');
    setSelectedCategory(category);
    setModalOpen(true);
  };

  // Handle modal success
  const handleModalSuccess = (category: Category) => {
    if (modalMode === 'create') {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    }
    showSuccess(`${modalMode === 'create' ? 'Created' : 'Updated'} successfully`);
  };

  // Define columns for DataTable
  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
    { id: 'name', label: 'Name', minWidth: 150 },
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
            onClick={() => handleEdit(row as Category)}
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDelete(row?.id as number)}
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
          Manage Categories
        </Typography>
        <DataTable
          title="Categories"
          columns={columns}
          rows={categories}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onAdd={handleAdd}
          addButtonLabel="Add Category"
        />
        <CategoryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          mode={modalMode}
          initialData={selectedCategory}
          onSuccess={handleModalSuccess}
        />
      </Box>
    </Box>
  );
}