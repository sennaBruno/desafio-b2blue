import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // Verde escuro
    },
    secondary: {
      main: "#81c784", // Verde claro
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">TESTE</Container>
    </ThemeProvider>
  );
}

export default App;
