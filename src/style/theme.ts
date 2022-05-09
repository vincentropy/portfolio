import { createTheme, GlobalStylesProps } from '@mui/material';

export const theme = createTheme({
  typography: {
    h1: { fontSize: 32 },
    h2: {
      fontSize: 24,
      fontWeight: 800,
    },
  },
  components: {
    MuiGrid: {
      defaultProps: {
        spacing: 4,
        columns: { xs: 4, sm: 8, md: 12 },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 12,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: 16,
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
