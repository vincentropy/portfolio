// import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingMarkdown } from '.';
import { loadMarkdownFile } from '../../api';

const testContent = `
# my first header

![my image](https://example.com/my_image_url.png "image title")
some text after the image

# second header
## sub header

more text
![another image](https://example.com/my_image_url.png "another image title")

`;

jest.mock('../../api');
const mockedLoadMarkdownFile = jest.mocked(loadMarkdownFile);

test('renders plain text', async () => {
  const responseText = testContent;
  mockedLoadMarkdownFile.mockResolvedValue(responseText);

  render(<LoadingMarkdown name="test_name" />);
  const element = await screen.findByText('my first header');

  expect(element).toBeInTheDocument();
});
