import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
  Box, Typography, TextField, InputAdornment, Button, Stack, Select, MenuItem, FormControl, InputLabel, Chip, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme, alpha } from '@mui/material/styles';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value) => React.ReactNode;
}

interface DataTableProps {
  title?: string;
  columns: Column[];
  rows: Record<string, unknown>[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (value: string) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
}

export default function DataTable({ 
  title, 
  columns, 
  rows, 
  page, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange,
  onSearch,
  onAdd,
  addButtonLabel = 'Add New'
}: DataTableProps) {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0}
      sx={{ 
        width: '100%', 
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
      }}
    >
      {/* Header Section */}
      <Box sx={{ p: 2.5 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
          {/* Search */}
          <TextField
            placeholder="Cari produk atau bundle..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              width: { xs: '100%', md: 300 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.default',
                '& fieldset': { border: 'none' } 
              }
            }}
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />

          <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
             {/* Filters - Dummy for now */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select displayEmpty defaultValue="" inputProps={{ 'aria-label': 'Kategori' }} sx={{ borderRadius: 2, bgcolor: 'background.default', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                <MenuItem value="">Kategori</MenuItem>
                <MenuItem value={10}>Makanan</MenuItem>
                <MenuItem value={20}>Minuman</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select displayEmpty defaultValue="" inputProps={{ 'aria-label': 'Status' }} sx={{ borderRadius: 2, bgcolor: 'background.default', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}>
                 <MenuItem value="">Status</MenuItem>
                <MenuItem value={10}>Aktif</MenuItem>
                <MenuItem value={20}>Non-Aktif</MenuItem>
              </Select>
            </FormControl>

             {/* Add Button */}
            {onAdd && (
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={onAdd}
                disableElevation
                sx={{ 
                  borderRadius: 2, 
                  textTransform: 'none', 
                  fontWeight: 600,
                  bgcolor: theme.palette.error.main, // Matching the red button in image
                  '&:hover': { bgcolor: theme.palette.error.dark }
                }}
              >
                {addButtonLabel}
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Table */}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sx={{ 
                    fontWeight: 600, 
                    color: 'text.secondary',
                    bgcolor: '#FFFFFF',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'} sx={{ py: 2 }}>
                         {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}