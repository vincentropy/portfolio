import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    h1: {fontSize: 32,},
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
        elevation: 2,
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
