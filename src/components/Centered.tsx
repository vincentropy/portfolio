import { Box, BoxProps } from '@mui/material';

export function Centered(props: BoxProps) {
  return (
    <Box
      display={'flex'}
      alignItems="center"
      justifyContent="center"
      maxWidth={'1200px'}
      margin="auto"
      minHeight="100vh"
      {...props}
    />
  );
}
