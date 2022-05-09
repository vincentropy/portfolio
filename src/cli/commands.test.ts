import * as cli from './commands';
import fs, { Dirent } from 'fs';

jest.mock('fs');
const mockedRead = jest.mocked(fs.readdirSync);
const mockedwrite = jest.mocked(fs.writeFileSync);

test('parser is created', () => {
  expect(cli.createParser).not.toThrow();
});

test('create index reads md files', () => {
  // console.log = jest.fn()
  mockedRead.mockReturnValue(['filename.md' as unknown as Dirent]);
  cli.createIndex('A', 'B');
  expect(mockedRead).toBeCalled();
  expect(mockedwrite).toBeCalled();
  // expect(console.log).toBeCalled()
  // expect(cli.createParser()).toThrowError()
});
