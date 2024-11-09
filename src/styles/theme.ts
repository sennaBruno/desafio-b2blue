import { createTheme } from '@mui/material';
import { green, lightGreen, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[700],
      light: green[400],
      dark: green[900],
    },
    secondary: {
      main: lightGreen[400],
      light: lightGreen[200],
      dark: lightGreen[700],
    },
    background: {
      default: grey[50],
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
