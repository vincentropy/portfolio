import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '.';

jest.mock("../../api")

test('renders title', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/Hello/);
  expect(linkElement).toBeInTheDocument();
});
