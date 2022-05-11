import { Box, BoxProps } from '@mui/material';

export function Centered(props: BoxProps) {
  return (
    <Box
      maxWidth={'1200px'}
      marginLeft="auto"
      marginRight="auto"
      marginTop="5%"
      minHeight="100vh"
      {...props}
    />
  );
}
