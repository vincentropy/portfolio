// import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingMarkdown } from '.';
import { loadMarkdownFile } from '../../api';
import { Markdown } from './Markdown';

jest.mock('../../api');
const mockedLoadMarkdownFile = jest.mocked(loadMarkdownFile);

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
  expect(element.tagName).toEqual('H2')
});

test('calls api', async () => {
  const responseText = testContent;
  mockedLoadMarkdownFile.mockResolvedValue(responseText);
  render(<LoadingMarkdown name="test_name" />);
  await screen.findByTestId("data-ready")

  expect(mockedLoadMarkdownFile).toBeCalledTimes(1)
});
