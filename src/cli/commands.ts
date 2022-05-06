import * as fs from 'fs';
// const yargs = require('yargs/yargs')
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function createParser() {
  const parser = yargs(hideBin(process.argv))
    .command({
      command: 'create-index [path] [file]',
      aliases: ['ci'],
      builder: (yargs) =>
        yargs
          .positional('path', {
            describe: 'Path to md files.',
            type: 'string',
            default: './public/content',
          })
          .positional('file', {
            describe: 'Output file.',
            type: 'string',
            default: './public/content_index.json',
          }),
      handler: (argv) => {
        createIndex(argv.path as string, argv.file as string);
      },
    })
    .demandCommand(1)
    .help()
    .wrap(72);
  return parser;
}

export function createIndex(mdPath: string, outFilePath: string) {
  console.log('reading md files from: ' + mdPath);
  const files = fs.readdirSync(mdPath).filter((value) => value.endsWith('.md'));

  console.log('found: ' + files.join(', '));
  const outputData: Record<string, any> = {};

  outputData['pages'] = files.map((value) => ({ filename: value }));
  outputData['title'] = '';
  const outString = JSON.stringify(outputData);
  fs.writeFileSync(outFilePath, outString);
}
