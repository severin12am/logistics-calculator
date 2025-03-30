import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import LogisticsCalculator from './components/LogisticsCalculator';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <LogisticsCalculator />
      </div>
    </ThemeProvider>
  );
}

export default App;
