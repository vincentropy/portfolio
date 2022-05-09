import { Typography, TypographyProps, TypographyVariant } from '@mui/material';
import { ImgHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGemoji from 'remark-gemoji';

function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="" style={{ maxWidth: '100%', ...props.style }} {...props} />;
}

export function typographyFactory(variant: TypographyVariant) {
  return (props: TypographyProps) => (
    <Typography variant={variant} {...props} />
  );
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
};

export function Markdown(props: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGemoji]} components={componentMap}>
      {props.markdown}
    </ReactMarkdown>
  );
}
