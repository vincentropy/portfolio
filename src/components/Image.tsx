import { ImgHTMLAttributes } from "react";

export function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img alt="" style={{ maxWidth: '100%', ...props.style }} {...props} />;
}
