import * as api from '.';
import axios from 'axios';

jest.mock('axios');
const mockedAxiosGet = jest.mocked(axios.get);

test('md file loader returns data', async () => {
  const responseData = { data: 'mock response' };
  mockedAxiosGet.mockResolvedValue(responseData);

  const data = await api.loadMarkdownFile('some url');

  expect(data).toEqual(responseData.data);
});

test('json file loader returns data', async () => {
  const responseData = { data: {"pages": []} };
  mockedAxiosGet.mockResolvedValue(responseData);

  const data = await api.loadIndex('some url');

  expect(data).toBeInstanceOf(Object);
  expect(Object.hasOwn(data, 'pages')).toBeTruthy();
});
