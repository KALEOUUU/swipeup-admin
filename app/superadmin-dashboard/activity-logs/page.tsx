'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Chip, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/layouts/data-table';
import Sidebar from '@/components/layouts/sidebar';
import { getAllActivities } from '../services/activity-log.service';
import { ActivityLog } from '../types/activity-log.types';
import { showError } from '@/hook/useToast';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    format?: (value: unknown, row?: Record<string, unknown>) => React.ReactNode;
}

export default function ActivityLogsPage() {
    const router = useRouter();
    const [activities, setActivities] = useState<ActivityLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [actionFilter, setActionFilter] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await getAllActivities({
                    action: actionFilter || undefined,
                    limit: 100,
                    offset: 0,
                });
                setActivities(data);
            } catch (error) {
                console.error('Failed to fetch activity logs:', error);
                showError('Failed to fetch activity logs');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [actionFilter]);

    const columns: Column[] = [
        { id: 'id', label: 'ID', minWidth: 70 },
        {
            id: 'user',
            label: 'Username',
            minWidth: 150,
            format: (value, row) => {
                const activity = row as unknown as ActivityLog;
                return activity.user?.username || '-';
            },
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 130,
            format: (value) => <Chip label={value as string} size="small" color="primary" />,
        },
        {
            id: 'details',
            label: 'Details',
            minWidth: 200,
        },
        {
            id: 'ip_address',
            label: 'IP Address',
            minWidth: 130,
        },
        {
            id: 'CreatedAt',
            label: 'Timestamp',
            minWidth: 180,
            format: (value) => new Date(value as string).toLocaleString('id-ID'),
        },
    ];

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                            Activity Logs
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Monitor aktivitas pengguna sistem
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        label="Filter by Action"
                        variant="outlined"
                        size="small"
                        value={actionFilter}
                        onChange={(e) => setActionFilter(e.target.value)}
                        placeholder="e.g., login, add_to_cart"
                        sx={{ minWidth: 250 }}
                    />
                </Box>

                <DataTable
                    title="Activity Logs"
                    columns={columns}
                    rows={activities as unknown as Record<string, unknown>[]}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>
        </Box>
    );
}
