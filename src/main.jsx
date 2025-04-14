// src/main.jsx
import React from 'react';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';  // Импорт регистрации Service Worker

import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Зарегистрировать Service Worker для PWA
serviceWorkerRegistration.register();