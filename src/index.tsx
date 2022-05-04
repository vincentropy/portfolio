import React from 'react';
import ReactDOM from 'react-dom/client';
// import './style/index.css';
import { App } from './components/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { theme } from './style/theme';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
