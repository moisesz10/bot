import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import App from './App';

// Tema base
const theme = createTheme({
  palette: {
    mode: 'light', // pode mudar para 'dark'
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Reset CSS + estilos globais */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
