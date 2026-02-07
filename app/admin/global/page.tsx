'use client';

import React, { useState, useEffect } from 'react';
import { Box, Stack, Button } from '@mui/material';
import CustomCard from '@/components/molecules/card';
import ButtonWithText from '@/components/molecules/button-with-text';
import InputField from '@/components/atoms/input-fields';
import CustomTypography from '@/components/atoms/typography';
import Sidebar from '@/components/layouts/sidebar';
import { getAllGlobalSettings, updateGlobalSetting } from './services/global.service';
import { GlobalSetting, UpdateGlobalSettingRequest } from './types/global.types';
import { showSuccess, showError } from '@/hook/useToast';

export default function GlobalSettingsPage() {
  const [settings, setSettings] = useState<GlobalSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAllGlobalSettings();
        setSettings(data);
      } catch (error) {
        showError('Failed to fetch global settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Handle update
  const handleUpdate = async (key: string, value: string) => {
    setUpdating(prev => ({ ...prev, [key]: true }));
    try {
      await updateGlobalSetting(key, { value });
      // Update local state
      setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
      showSuccess('Setting updated successfully');
    } catch (error) {
      showError('Failed to update setting');
    } finally {
      setUpdating(prev => ({ ...prev, [key]: false }));
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Sidebar role="admin" />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <CustomTypography>Loading...</CustomTypography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="admin" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <CustomTypography variant="h4" sx={{ mb: 3 }}>
          Global Settings
        </CustomTypography>
        <CustomCard sx={{ maxWidth: 800, p: 3 }}>
          <Stack spacing={3}>
            {settings.map((setting) => (
              <Box key={setting.key} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <CustomTypography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {setting.key.replace('_', ' ').toUpperCase()}
                  </CustomTypography>
                  <InputField
                    fullWidth
                    defaultValue={setting.value}
                    onChange={(e) => {
                      // Update local value for display
                      setting.value = e.target.value;
                    }}
                  />
                </Box>
                <ButtonWithText
                  text={updating[setting.key] ? 'Updating...' : 'Update'}
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(setting.key, setting.value)}
                  disabled={updating[setting.key]}
                  size="small"
                />
              </Box>
            ))}
          </Stack>
        </CustomCard>
      </Box>
    </Box>
  );
}