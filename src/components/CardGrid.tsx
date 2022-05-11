import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import { IndexData, loadMarkdownFile } from '../api';
import { withLoader } from '../api/loader';
import { MarkdownCard } from './Markdown/MarkdownCard';

const LoadingMarkdown = withLoader(MarkdownCard, loadMarkdownFile);

function GridItem(props: { filename?: string; tall?: boolean }) {
  return (
    <div>
      {props.filename ? (
        <LoadingMarkdown url={props.filename} tall={props.tall} />
      ) : (
        <MarkdownCard tall={props.tall} />
      )}
    </div>
  );
}

export function CardGrid(props: { data?: IndexData }) {
  const { data } = { ...props };

  const items =
    data &&
    data.pages.map((item, index) => (
      <GridItem filename={item.filename} tall={item.tall} key={index} />
    ));

  return (
    <Box
      width={{ xs: 330, sm: 330 * 2 + 16 * 2, lg: 330 * 3 + 16 * 3 }}
      margin="auto"
    >
      <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
        {items || []}
      </Masonry>
    </Box>
  );
}
