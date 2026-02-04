'use client';

import React, { useState } from 'react';
import { Box, Container, Stack, Typography, Chip, IconButton } from '@mui/material';
import Sidebar from '@/components/layouts/sidebar';
import DataTable from '@/components/layouts/data-table';
import ProductModal from '@/components/layouts/product-modal';
import { showSuccess } from '@/hook/useToast';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const columns = [
  { 
    id: 'nama_produk', 
    label: 'Nama Produk', 
    minWidth: 250,
    format: (value) => (
      <Stack direction="row" spacing={2} alignItems="center">
        <Box 
          sx={{ 
            width: 40, 
            height: 40, 
            bgcolor: 'action.hover', 
            borderRadius: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Inventory2OutlinedIcon fontSize="small" color="action" />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">SKU-89234</Typography>
        </Box>
      </Stack>
    )
  },
  { id: 'kategori', label: 'Kategori', minWidth: 120 },
  { 
    id: 'harga', 
    label: 'Harga Jual', 
    minWidth: 120,
    format: (value) => `Rp ${parseInt(value).toLocaleString('id-ID')}`
  },
  { id: 'stok', label: 'Stok', minWidth: 100 },
  { 
    id: 'status', 
    label: 'Status', 
    minWidth: 100,
    format: (value) => (
      <Chip 
        label={value} 
        size="small" 
        sx={{ 
          bgcolor: value === 'Aktif' ? '#FFEBEE' : '#E0E0E0', 
          color: value === 'Aktif' ? '#D32F2F' : '#616161',
          fontWeight: 600,
          borderRadius: 1
        }} 
      />
    )
  },
  {
    id: 'actions',
    label: 'Aksi',
    minWidth: 50,
    align: 'center',
    format: () => (
      <IconButton size="small">
        <MoreHorizIcon fontSize="small" />
      </IconButton>
    )
  }
];

const initialRows = [
  { id: '1', nama_produk: 'Bakso', kategori: 'Makanan', harga: '10000', stok: '8', status: 'Aktif' },
  { id: '2', nama_produk: 'Es Teh Manis', kategori: 'Minuman', harga: '5000', stok: '20', status: 'Aktif' },
  { id: '3', nama_produk: 'Nasi Goreng Spesial', kategori: 'Makanan', harga: '25000', stok: '15', status: 'Aktif' },
  { id: '4', nama_produk: 'Paket Hemat 1', kategori: 'Bundle', harga: '35000', stok: '10', status: 'Aktif' },
  { id: '5', nama_produk: 'Mie Ayam', kategori: 'Makanan', harga: '12000', stok: '25', status: 'Aktif' },
];

export default function AdminDashboard() {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<null | Record<string, unknown>>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (editingProduct) {
      setRows(rows.map(row => row.id === editingProduct.id ? { ...row, ...data } : row));
      showSuccess('Product updated successfully');
    } else {
      const newProduct = { 
        ...data, 
        id: (rows.length + 1).toString(), 
        kategori: 'Makanan', 
        status: 'Aktif' 
      };
      setRows([...rows, newProduct]);
      showSuccess('Product added successfully');
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F5F7FA', minHeight: '100vh' }}>
      <Sidebar role="admin_stan" />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 280px)` } }}>
        <Container maxWidth="xl">
          <Box mb={4} mt={2}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Produk
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Kelola semua produk dalam sistem
            </Typography>
          </Box>
          
          <DataTable
            addButtonLabel="Tambah Produk"
            columns={columns}
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onSearch={(val) => console.log(val)}
            onAdd={handleAddProduct}
          />
        </Container>
      </Box>
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingProduct}
      />
    </Box>
  );
}