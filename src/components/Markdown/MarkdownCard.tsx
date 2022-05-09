import { Grid, Skeleton } from '@mui/material';
// import { Image } from 'mdast';
// import { ImgHTMLAttributes } from 'react';
import { Markdown } from './Markdown';
import { shorten } from './markdown.utils';

// function ImageComponent(props: ImgHTMLAttributes<HTMLImageElement>) {
//   return <img alt="" style={{ width: '100%', filter:"grayscale(100%)", ...props.style }} {...props} />;
// }

// type State = {
//   // text: string;
//   image?: Image;
// };

export function MarkdownCardSkeleton() {
  return (
    <>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </>
  );
}

export function MarkdownCard(props: { data: string | null }) {
  // const [state, setState] = useState<State>({});

  // useEffect(() => {
  //   async function populate() {
  //     if (!props.data) return;
  //     const parsed = await remark().parse(props.data);
  //     // const shortParsed = await remark().parse(shorten(props.data, 100));
  //     const image = getHeadingImage(parsed);
  //     // const header = getFirstHeadingText(parsed);
  //     // const text = firstParText(parsed);
  //     setState({ image });
  //   }
  //   populate();
  // }, [props.data]);

  return !props.data ? (
    <MarkdownCardSkeleton />
  ) : (
    <Grid container direction={'column'}>
      {/* {state.image && (
        <Grid item >
          <ImageComponent
            src={state.image.url}
            alt={state.image.alt as string}
          />
        </Grid>
      )} */}
      <Grid item>
        <Markdown markdown={shorten(props.data, 600)} />
      </Grid>
    </Grid>
  );
}
