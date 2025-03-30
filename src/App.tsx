import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LogisticsCalculator from './components/LogisticsCalculator';
import { Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `
            linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 34h-2v-4h2v4zm0-8h-2v-4h2v4zm0-8h-2v-4h2v4zm-8 16h-2v-4h2v4zm0-8h-2v-4h2v4zm0-8h-2v-4h2v4z' fill='%23e0e0e0'/%3E%3Cpath d='M15 15h30v30H15V15zm2 2h26v26H17V17z' stroke='%23e0e0e0' stroke-width='2'/%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundRepeat: 'repeat',
          pt: 2,
          pb: 4,
        }}
      >
        <LogisticsCalculator />
      </Box>
    </ThemeProvider>
  );
}

export default App;
