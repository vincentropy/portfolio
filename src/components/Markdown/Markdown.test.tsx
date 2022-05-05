// import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarkdownCard } from '.';
import { Markdown } from './Markdown';

const testContent = `
# my first header

![my image](https://example.com/my_image_url.png "image title")
some text after the image

# second header
## sub header

more text
![another image](https://example.com/my_image_url.png "another image title")

`;

test('renders markdown', () => {
  render(<Markdown markdown={testContent} />);
  const element = screen.getByText('my first header');

  expect(element).toBeInTheDocument();
  expect(element.tagName).toEqual('H2');
});

test('renders preview', async () => {
  render(<MarkdownCard data={testContent} />);
  const headerElement = await screen.findByText('my first header');
  const imgElement = await screen.findByAltText('my image');

  expect(headerElement).toBeInTheDocument();
  expect(imgElement).toBeInTheDocument();
});
