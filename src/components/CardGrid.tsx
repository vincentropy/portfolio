import { Grid, Paper } from '@mui/material';
import { IndexData, loadMarkdownFile } from '../api';
import { withLoader } from '../api/loader';
import { MarkdownCard } from './Markdown/MarkdownCard';

const LoadingMarkdown = withLoader(MarkdownCard, loadMarkdownFile);

function GridItem(props: { filename: string }) {
  return (
    <Grid item xs={4}>
      <Paper sx={{ height: '100%' }}>
        <LoadingMarkdown url={props.filename} />
      </Paper>
    </Grid>
  );
}

export function CardGrid(props: { data: IndexData }) {
  const { data } = { ...props };
  const items =
    data &&
    data.pages.map((item, index) => (
      <GridItem filename={item.filename} key={index} />
    ));

  return (
    <Grid container alignItems="stretch" direction="row">
      {items}
    </Grid>
  );
}
