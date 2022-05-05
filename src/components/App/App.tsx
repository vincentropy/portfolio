import { useEffect, useState } from 'react';
import { loadIndex, IndexData } from '../../api';
import { LoadingMarkdown } from '../Markdown';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { Centered } from '../Centered';

export const title = (
  <>
    Hello 👋, my name is Vincent.
    <br />
    Here are some projects I've worked on.
  </>
);

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
  const [indexData, setIndexData] = useState<IndexData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function populate() {
      try {
        const data = await loadIndex();
        setIndexData(data);
      } catch (e) {
        const error = e as Error;
        console.log(error.message);
        setError(error.message);
      }
    }
    populate();
  }, []);

  const items =
    indexData &&
    indexData.pages.map((item, index) => (
      <GridItem filename={item.filename} key={index} />
    ));

  return (
    <Centered>
      <Stack direction="column">
        <Typography variant="h1">{title}</Typography>
        <Grid container alignItems="stretch" direction="row">
          {items}
        </Grid>
      </Stack>
    </Centered>
  );
}
