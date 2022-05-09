import * as api from '.';
import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('axios');
const mockedAxiosGet = jest.mocked(axios.get);
const TestComponent = (props: { data: string; other: number }) => (
  <div>{props.data && props.data}</div>
);

test('loader returns function', () => {
  const LoadingDiv = api.withLoader(TestComponent, api.loadMarkdownFile);

  expect(LoadingDiv).toBeInstanceOf(Function);
});

test('loader passes data from axios', async () => {
  const responseData = { data: 'mock response' };
  mockedAxiosGet.mockResolvedValue(responseData);

  const LoadingDiv = api.withLoader(TestComponent, api.loadMarkdownFile);
  render(<LoadingDiv url="some url" other={5} />);
  const element = await screen.findByText(responseData.data);

  expect(mockedAxiosGet).toBeCalled();
  expect(element).toBeInTheDocument();
});

test('loader logs on error', async () => {
  const responseData = { data: 'mock response' };
  mockedAxiosGet.mockRejectedValue('bad data');
  console.log = jest.fn();

  const LoadingDiv = api.withLoader(TestComponent, api.loadMarkdownFile);
  render(<LoadingDiv url="some url" other={5} />);
  await waitFor(() => {
    expect(console.log).toBeCalled();
  });
  const element = screen.queryByText(responseData.data);

  expect(mockedAxiosGet).toBeCalled();
  expect(console.log).toBeCalled();
  expect(element).not.toBeInTheDocument();
});
