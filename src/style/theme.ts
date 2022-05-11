import { createTheme, GlobalStylesProps } from '@mui/material';

export const theme = createTheme({
  palette: { primary: { main: '#00f' }, secondary: { main: '#6245ac' } },
  typography: {
    h1: { fontSize: 32, letterSpacing: 1.2 },
    h2: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: 1.2,
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
});

export const globalStyles: GlobalStylesProps = {
  styles: {
    body: {
      background:
        'linear-gradient(45deg, rgba(228,228,255,1) 50%, rgba(205,246,255,1) 100%)',
    },
  },
};
