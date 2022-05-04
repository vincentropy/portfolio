import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '.';
import { title } from './App';

test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(title);
  expect(linkElement).toBeInTheDocument();
});
