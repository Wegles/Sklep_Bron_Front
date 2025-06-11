import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#2A3F54',
      light: '#B0C4DE', 
      contrastText: '#fff'
    },
    secondary: {
      main: '#2A9D8F', 
      contrastText: '#fff'
    },
    background: {
      default: '#F8F9FB', 
      paper: '#FFFFFF' 
    },
    text: {
      primary: '#2F4F4F', 
      secondary: '#696969' 
    },
    success: {
      main: '#77DD77', 
      contrastText: '#fff'
    },
    warning: {
      main: '#FFB703', 
      contrastText: '#fff'
    },
    error: {
      main: '#E63946', 
      contrastText: '#fff'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 8px rgba(42,63,84,0.07)',
        },
        containedPrimary: {
          backgroundColor: '#2A3F54',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2A9D8F',
          },
        },
        outlinedPrimary: {
          borderColor: '#2A3F54',
          color: '#2A3F54',
          '&:hover': {
            borderColor: '#2A9D8F',
            color: '#2A9D8F',
            backgroundColor: '#F8F9FB',
          },
        },
      },
    },
  },
});

export default Theme;
