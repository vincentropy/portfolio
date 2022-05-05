import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '.';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello/);
  expect(linkElement).toBeInTheDocument();
});
