import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0070f3',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
