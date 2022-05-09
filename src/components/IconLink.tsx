import { Link } from '@mui/material';
import React, { AnchorHTMLAttributes, ReactElement } from 'react';
import { urlToHost } from '../util';
import { Image } from './Image';


// type IconLinkProps = Omit<LinkProps, 'href'> & { href: string };
type IconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> 

export function IconLink(props: IconLinkProps) {
  const { href } = props;
  const host = href ? urlToHost(href) : '';
  const iconLocation = `icons/${host}.png`;
  const elementChildren = React.Children.toArray(props.children).filter(
    (child) => typeof child === 'object',
  ) as ReactElement[];
  const types = elementChildren.map((child) => child.type);

  // dont use icons if the link already contains an image
  const useIcon = !types.map((type) => type === Image).includes(true)

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {href && useIcon && (
        <img
          src={iconLocation}
          alt=""
          style={{ width: '1em', height: '1em', marginRight: '0.2em' }}
        />
      )}
      <Link {...props} />
    </span>
  );
}
