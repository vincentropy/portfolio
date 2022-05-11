import {
  Grid,
  GridProps,
  Typography,
  TypographyProps,
  TypographyVariant
} from '@mui/material';
import { Children, LiHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGemoji from 'remark-gemoji';
import { IconLink } from '../IconLink';
import { Image } from '../Image';

export function typographyFactory(variant: TypographyVariant) {
  return (props: TypographyProps) => (
    <Typography variant={variant} {...props} />
  );
}

export function GridIfMany(props: GridProps & { minItems: number }) {
  const objectChildren = Children.toArray(props.children).filter(
    (child) => typeof child === 'object',
  );

  if (objectChildren.length > props.minItems)
    return (
      <Grid container children={props.children} columns={2} spacing={0.3} />
    );
  return <Grid container children={props.children} columns={1} spacing={0.3} />;
}
// Map MUI typography to markdown components
const baseMarkdownHeaderLevel = 2;
const headerMap = Object.fromEntries(
  [1, 2, 3, 4].map((value) => [
    `h${value}`,
    typographyFactory(
      `h${value + baseMarkdownHeaderLevel - 1}` as TypographyVariant,
    ),
  ]),
);

const componentMap = {
  ...headerMap,
  p: typographyFactory('body1'),
  img: Image,
  a: IconLink,
  ul: (props: LiHTMLAttributes<HTMLElement>) => (
    <GridIfMany children={props.children} minItems={6} />
  ),
  li: (props: LiHTMLAttributes<HTMLElement>) => (
    <Grid item children={props.children} xs={1} />
  ),
};

export function Markdown(props: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGemoji]} components={componentMap}>
      {props.markdown}
    </ReactMarkdown>
  );
}
