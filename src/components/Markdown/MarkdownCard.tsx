import { Box, Fade, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { Image, Root } from 'mdast';
import { toMarkdown } from 'mdast-util-to-markdown';
import { useEffect, useState } from 'react';
import { remark } from 'remark';
import { Markdown } from './Markdown';
import * as utils from './markdown.utils';

export const MarkdownCardSkeleton = ({ tall }: { tall?: boolean }) => {
  return (
    <Box margin={1}>
      {tall ? (
        <Skeleton
          animation="wave"
          height={'300px'}
          variant="rectangular"
          sx={{ marginBottom: '2rem' }}
        />
      ) : (
        <Grid
          container
          sx={{ width: '100%' }}
          columns={12}
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={4}>
            <Skeleton animation="wave" height={'8rem'} />
          </Grid>
          <Grid item xs={8}>
            <Skeleton animation="wave" height={'2rem'} />
            <Skeleton animation="wave" height={'2rem'} />
          </Grid>
        </Grid>
      )}
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};

const CardImage = ({ image }: { image: Image }) => (
  <img
    src={image.url}
    alt={image.alt || ''}
    style={{ height: '300px', minWidth: '100%' }}
  />
);

const CardHeading = ({ heading }: { heading: string }) => (
  <Typography
    variant="h2"
    sx={{
      paddingTop: 2,
      paddingLeft: 2,
      paddingRight: 2,
    }}
  >
    {heading}
  </Typography>
);

const CardContents = (props: {
  heading?: string;
  image?: Image;
  filteredMarkdown?: string;
}) => (
  <>
    {props.image && <CardImage image={props.image} />}
    {props.heading && <CardHeading heading={props.heading} />}
    {props.filteredMarkdown && (
      <Box margin={2}>
        <Markdown markdown={utils.shorten(props.filteredMarkdown, 600)} />
      </Box>
    )}
  </>
);

type State = { heading?: string; image?: Image; filteredMarkdown?: string };

export function MarkdownCard(props: { data?: string; tall?: boolean }) {
  const [state, setState] = useState<State>({});

  useEffect(() => {
    const populate = async () => {
      if (!props.data) return;
      let parsed = await remark().parse(props.data);
      const newState: State = {};

      const image = utils.getHeadingImage(parsed);
      if (image) {
        const { tree } = utils.filterTree(parsed, 'heading', 1);
        parsed = tree as Root;
        newState.image = image;
      }
      newState.heading = utils.getFirstHeadingText(parsed);
      const { tree } = utils.filterTree(parsed, 'heading', 1);
      parsed = tree as Root;
      newState.filteredMarkdown = toMarkdown(parsed);
      setState(newState);
    };

    populate();
  }, [props.data]);

  return (
    <>
      <Paper
        sx={{
          height: props.tall ? 600 + 16 : 300,
          width: 330,
          margin: 'auto',
          position: 'relative',
        }}
      >
        {!state.filteredMarkdown && <MarkdownCardSkeleton tall={props.tall} />}
        <Fade key={0} in={state.filteredMarkdown !== undefined} timeout={1000}>
          <Box>
            <CardContents {...state} />
          </Box>
        </Fade>
      </Paper>
    </>
  );
}
