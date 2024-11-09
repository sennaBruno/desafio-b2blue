import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';

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
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Sistema de Controle de Resíduos
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
