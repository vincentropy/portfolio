import * as fetchIcons from './fetch-icons';
import fs from 'fs/promises';
import axios from 'axios';
import { Dirent, Stats } from 'fs';

// jest.mock('fs');
jest.mock('fs/promises');
jest.mock('axios');

afterAll(() => {
  jest.clearAllMocks();
});

test('fetch icons calls fetch once if domain specified', async () => {
  const mockedFileWrite = jest.mocked(fs.writeFile);
  const mockedAxiosGet = jest.mocked(axios.get);
  mockedAxiosGet.mockResolvedValue({ status: 200, data: '' });
  const mockedStat = jest.mocked(fs.stat);
  mockedStat.mockReturnValue(new Promise((resolve, reject) => reject()));

  await fetchIcons.fetchIcons('./', undefined, 'example.com');

  expect(mockedAxiosGet).toBeCalledTimes(1);
  expect(mockedFileWrite).toBeCalledTimes(1);
});

test('fetch icons calls fetch N times if path specified', async () => {
  const mockedFileWrite = jest.mocked(fs.writeFile);
  const mockedFileRead = jest.mocked(fs.readFile);
  const mockedAxiosGet = jest.mocked(axios.get);
  const mockedReaddir = jest.mocked(fs.readdir);
  mockedReaddir.mockResolvedValue([
    'file1.md' as unknown as Dirent,
    'file2.md' as unknown as Dirent,
  ]);
  mockedAxiosGet.mockResolvedValue({ status: 200, data: '' });
  mockedFileRead.mockResolvedValue(
    'my file with a link [this is a link](https://www.example.com/)',
  );
  const mockedStat = jest.mocked(fs.stat);
  mockedStat.mockReturnValue(new Promise((resolve, reject) => reject()));

  await fetchIcons.fetchIcons('./', './');

  expect(mockedAxiosGet).toBeCalledTimes(1);
  expect(mockedReaddir).toBeCalledTimes(1);
  expect(mockedFileRead).toBeCalledTimes(2);
  expect(mockedFileWrite).toBeCalledTimes(1);
});
