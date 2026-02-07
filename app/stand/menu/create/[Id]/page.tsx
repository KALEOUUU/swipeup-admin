'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Sidebar from '@/components/layouts/sidebar';
import { menuService } from '../../services/menu.service';
import {
  updateMenuSchema,
  UpdateMenuSchemaType,
} from '../../validation/menu.validation';
import { showSuccess, showError } from '@/hook/useToast';

export default function EditMenuPage() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.Id;
  const id = idParam ? Number(idParam) : null;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateMenuSchemaType>({
    resolver: yupResolver(updateMenuSchema),
  });

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const menu = await menuService.getMenuById(id);
        // prefill values
        setValue('nama_makanan', menu.nama_makanan);
        setValue('harga', menu.harga);
        setValue('jenis', menu.jenis);
        setValue('deskripsi', menu.deskripsi);
        setValue('stock', menu.stock);
        // foto may be stored as path, make full url
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
        if (menu.foto) {
          const src = menu.foto.startsWith('http') || menu.foto.startsWith('data:') ? menu.foto : `${BASE_URL}/${menu.foto}`;
          setImagePreview(src);
        }
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        showError('Failed to load menu data');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setValue('foto', base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setValue('foto', '');
    setImagePreview(null);
  };

  const onSubmit: SubmitHandler<UpdateMenuSchemaType> = async (data) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await menuService.updateMenu(id, data);
      showSuccess('Menu updated successfully!');
      router.push('/admin-dashboard/menu');
    } catch (err) {
      console.error('Failed to update menu:', err);
      showError('Failed to update menu. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Sidebar role="admin_stan" />
        <Box sx={{ flexGrow: 1, p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Sidebar role="admin_stan" />
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Edit Menu
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Perbarui informasi menu
            </Typography>
          </Box>
          <Button variant="outlined" onClick={() => router.push('/admin-dashboard/menu')}>
            Kembali
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Informasi Menu Card */}
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Informasi Menu
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Masukkan informasi dasar untuk menu produk
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Nama Makanan */}
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Nama Makanan
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukkan nama makanan"
                    size="small"
                    {...register('nama_makanan')}
                    error={!!errors.nama_makanan}
                    helperText={errors.nama_makanan?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                  />
                </Box>

                {/* Jenis */}
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Jenis
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    {...register('jenis')}
                    error={!!errors.jenis}
                    helperText={errors.jenis?.message}
                  >
                    <MenuItem value="" disabled>Pilih jenis</MenuItem>
                    <MenuItem value="makanan">Makanan</MenuItem>
                    <MenuItem value="minuman">Minuman</MenuItem>
                  </TextField>
                </Box>

                {/* Deskripsi */}
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Deskripsi
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Jelaskan detail menu ini..."
                    multiline
                    rows={4}
                    size="small"
                    {...register('deskripsi')}
                    error={!!errors.deskripsi}
                    helperText={errors.deskripsi?.message}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Foto Menu Card */}
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Foto Menu
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Upload foto untuk menu produk
              </Typography>

              {!imagePreview ? (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                  component="label"
                >
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                  <Box
                    sx={{
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      p: 3,
                      width: 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                      PNG, JPG, GIF, WEBP (Max 5MB)
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ cursor: 'pointer' }}>
                    Klik untuk upload foto
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 200,
                      height: 200,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 2,
                    }}
                  >
                    <Image src={imagePreview} alt="Preview" fill style={{ objectFit: 'cover' }} />
                  </Box>
                  <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={handleRemoveImage} sx={{ mt: 2 }}>
                    Hapus Foto
                  </Button>
                </Box>
              )}
              {errors.foto && (
                <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {errors.foto.message}
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Harga & Stock Card */}
          <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Harga & Stock
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Atur harga dan ketersediaan stock
              </Typography>

              <Grid container spacing={3}>
                <Grid component="div" item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Harga
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukkan harga"
                    type="number"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ mr: 1, color: 'text.secondary' }}>Rp</Typography>
                      ),
                    }}
                    {...register('harga')}
                    error={!!errors.harga}
                    helperText={errors.harga?.message}
                  />
                </Grid>
                <Grid component="div" item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    Stock
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukkan jumlah stock"
                    type="number"
                    size="small"
                    {...register('stock')}
                    error={!!errors.stock}
                    helperText={errors.stock?.message}
                  />
                </Grid>
                <Grid component="div" item xs={12} md={6}>
                  <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1 }}>
                    ID Stan
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Masukkan ID Stan"
                    type="number"
                    size="small"
                    {...register('id_stan')}
                    error={!!errors.id_stan}
                    helperText={errors.id_stan?.message}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={() => router.push('/admin-dashboard/menu')}>
              Batal
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}