import { createTheme, GlobalStylesProps } from '@mui/material';

export const theme = createTheme({
  palette: { primary: { main: '#00f' }, secondary: { main: '#6245ac' } },
  typography: {
    h1: {
      fontSize: 32,
      letterSpacing: 1.3,
      fontFamily: [
        'Narifah',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h2: {
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: 1.3,
      fontFamily: [
        'Narifah',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    body1: {
      fontFamily: [
        'Cedora',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontWeight: 400,
      // letterSpacing: 1.05,
    },
  },
  components: {
    MuiGrid: {
      defaultProps: {
        spacing: 2,
        columns: { xs: 4, sm: 8, md: 12 },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          // padding: 16,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 725,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const globalStyles: GlobalStylesProps = {
  styles: {
    body: {
      background:
        'linear-gradient(45deg, rgba(228,228,255,1) 50%, rgba(205,246,255,1) 100%)',
    },
  },
};
