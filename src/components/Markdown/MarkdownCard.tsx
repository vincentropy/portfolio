import { Grid, Typography } from '@mui/material';
import { Image } from 'mdast';
import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { remark } from 'remark';
import { Markdown } from './Markdown';
import { firstParText, getFirstHeadingText, getImages } from './markdown.utils';

function ImageComponent(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="" style={{ width: '100%', ...props.style }} {...props} />;
}

type State = {
  header: string;
  text: string;
  image?: Image;
};

export function MarkdownCard(props: { data: string }) {
  const [state, setState] = useState({ header: '', text: '' } as State);

  useEffect(() => {
    async function populate() {
      const parsed = await remark().parse(props.data);
      const images = getImages(parsed);
      const image = images.length ? images[0] : undefined;
      const header = getFirstHeadingText(parsed);
      const text = firstParText(parsed);
      setState({ header, text, image });
    }
    populate();
  }, [props.data]);

  return (
    <Grid container columns={state.image ? 12 : 6}>
      {state.image && (
        <Grid item xs={6}>
          <ImageComponent
            src={state.image.url}
            alt={state.image.alt as string}
          />
        </Grid>
      )}
      <Grid item xs={6}>
        <Typography variant="h2">{state.header}</Typography>
        <Markdown markdown={state.text} />
      </Grid>
    </Grid>
  );
}
