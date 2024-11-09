import { Container, CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { PainelControle } from './components/PainelControle';
import { StationProvider } from './contexts/StationContext';
import { NotificationProvider } from './contexts/NotificationContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#81c784',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <StationProvider>
          <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
              <PainelControle />
            </Box>
          </Container>
        </StationProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
