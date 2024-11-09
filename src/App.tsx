import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { PainelControle } from './components/PainelControle';
import { StationProvider } from './contexts/StationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { theme } from './styles/theme';

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
