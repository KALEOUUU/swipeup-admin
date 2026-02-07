import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Avatar, Typography, useTheme, alpha } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { removeToken, getRoleFromToken, getToken } from '@/lib/token';
import { showSuccess } from '@/hook/useToast';

interface SidebarProps {
  role: 'admin' | 'stand';
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  // Mock user data - replace with real data from context/token
  const userName = role === 'admin' ? 'Admin' : 'Toko Bening';
  const userRole = role === 'admin' ? 'Administrator' : 'Admin Panel';

  const handleLogout = () => {
    removeToken();
    showSuccess('Logged out successfully');
    router.push('/account/login');
  };

  const menuItems = role === 'admin' ? [
    { text: 'Category', icon: <DashboardIcon />, path: '/admin/category' },
    { text: 'Manage Stand', icon: <PeopleIcon />, path: '/admin/stand' },
    { text: 'Register Stan', icon: <StoreIcon />, path: '/admin/register-stan' },
  ] : [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/stand' },
    { text: 'Menu', icon: <InventoryIcon />, path: '/stand/menu' },
    { text: 'Discount', icon: <LocalOfferIcon />, path: '/stand/discount' },
    { text: 'Transaksi', icon: <ShoppingCartIcon />, path: '/stand/orders' },
    { text: 'Laporan', icon: <AssessmentIcon />, path: '/stand/reports' },
    { text: 'Pelanggan', icon: <PeopleIcon />, path: '/stand/customers' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderRight: 'none',
          backgroundColor: '#FFFFFF',
          boxShadow: '4px 0 24px rgba(0,0,0,0.02)',
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar 
          src={role === 'stand' ? "https://ui-avatars.com/api/?name=Toko+Bening&background=0D5295&color=fff" : undefined}
          sx={{ 
            width: 48, 
            height: 48,
            bgcolor: theme.palette.primary.main,
            boxShadow: '0 4px 12px rgba(13, 82, 149, 0.2)'
          }}
        >
          {userName.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {userName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userRole}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 2, py: 1 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton 
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      color: theme.palette.primary.main,
                      '& .MuiListItemIcon-root': {
                        color: theme.palette.primary.main,
                      }
                    },
                  }}
                >
                  <ListItemIcon sx={{ 
                    minWidth: 40, 
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 500,
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      
      <Box sx={{ mt: 'auto', p: 2 }}>
         <ListItemButton 
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.04),
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: theme.palette.error.main }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
      </Box>
    </Drawer>
  );
}