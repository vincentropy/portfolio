import { Stack, Typography } from '@mui/material';
import { loadIndex } from '../../api';
import { withLoader } from '../../api/loader';
import { CardGrid } from '../CardGrid';
import { Centered } from '../Centered';

export const title = 'Hello 👋, my name is Vincent.';
export const subtitle = "Here are some projects I've worked on.";

const LoadingCardGrid = withLoader(CardGrid, loadIndex);

export function App() {
  return (
    <Centered>
      <Stack
        direction="column"
        width={'100%'}
        spacing={2}
        margin={1}
        alignItems="center"
      >
        <div>
          <Typography variant="h1" textAlign={'center'}>
            {title}
          </Typography>
          <Typography variant="subtitle1" textAlign={'center'}>
            {subtitle}
          </Typography>
        </div>
        <LoadingCardGrid url="/content_index.json" />
      </Stack>
    </Centered>
  );
}
