'use client';

import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Sidebar from '@/components/layouts/sidebar';
import DataTable from '@/components/layouts/data-table';

const columns = [
  { id: 'id', label: 'ID', minWidth: 100 },
  { id: 'username', label: 'Username', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'nama_stan', label: 'Nama Stan', minWidth: 170 },
];

const rows = [
  { id: '1', username: 'admin_stan_001', role: 'admin_stan', nama_stan: 'Warung Sejahtera' },
  // Tambahkan data dummy lainnya
];

export default function SuperadminDashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="superadmin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Superadmin Dashboard
          </Typography>
          <Typography variant="h6" gutterBottom>
            Manage Admin Stan
          </Typography>
          <DataTable
            columns={columns}
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Container>
      </Box>
    </Box>
  );
}