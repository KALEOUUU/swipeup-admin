import { createTheme } from '@mui/material/styles';

// Color palette inspired by Moka POS
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D5295', // Deep blue (background color)
      light: '#1565C0',
      dark: '#0A3D70',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00BFA5', // Teal/cyan (Coba gratis button)
      light: '#33CCBA',
      dark: '#008573',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#E65C3A', // Coral/orange-red (Jadwalkan Demo button)
      light: '#FF7D5C',
      dark: '#B34829',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4A4A68',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 32px',
        },
        containedPrimary: {
          backgroundColor: '#E65C3A',
          '&:hover': {
            backgroundColor: '#B34829',
          },
        },
        containedSecondary: {
          backgroundColor: '#00BFA5',
          '&:hover': {
            backgroundColor: '#008573',
          },
        },
        outlined: {
          borderColor: '#FFFFFF',
          color: '#0D5295',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F5F7FA',
            borderColor: '#FFFFFF',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(13, 82, 149, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export default theme;