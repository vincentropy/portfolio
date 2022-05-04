import { Grid } from '@mui/material';
import { Image } from 'mdast';
import { ImgHTMLAttributes, useEffect, useState } from 'react';
import { remark } from 'remark';
import { Markdown } from './Markdown';
import { firstParText, getImages } from './markdown.utils';

function ImageComponent(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="" style={{ width: '100%', ...props.style }} {...props} />;
}

type State = {
  text: string;
  image?: Image;
};

export function MarkdownCard(props: { markdown: string }) {
  const [state, setState] = useState({ image: undefined, text: '' } as State);

  useEffect(() => {
    async function populate() {
      const parsed = await remark().parse(props.markdown);
      const images = getImages(parsed);
      const image = images.length ? images[0] : undefined;
      const text = firstParText(parsed);
      setState({ text, image });
    }
    populate();
  }, [props.markdown]);

  console.log(state.text);

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
        <Markdown markdown={state.text} />
      </Grid>
    </Grid>
  );
}
