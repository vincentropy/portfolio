import { useEffect, useState } from 'react';
import { loadIndex, Page } from '../../api';
import { LoadingMarkdown } from '../Markdown';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Centered } from '../Centered';

export const title = 'hello';

function GridItem(props: { filename: string }) {
  return (
    <Grid item xs={4}>
      <Paper sx={{ height: '100%' }}>
        <LoadingMarkdown name={props.filename} />
      </Paper>
    </Grid>
  );
}

export function App() {
  const initialData: Page[] = [];
  const [indexData, setIndexData] = useState(initialData);

  useEffect(() => {
    async function populate() {
      const data = await loadIndex();
      setIndexData(data);
    }
    populate();
  }, []);

  return (
    <Centered>
      <Stack direction="column">
        <Typography variant="h1">{title}</Typography>
        <Grid container alignItems="stretch" direction="row">
          {indexData.map((item, index) => (
            <GridItem filename={item.filename} key={index} />
          ))}
        </Grid>
      </Stack>
    </Centered>
  );
}
