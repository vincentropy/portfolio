import * as fs from 'fs';
import { remark } from 'remark';
import yargs, { CommandModule } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fetchIconsCommand } from './fetch-icons';

const indexCommand: CommandModule = {
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
};

const printTreeCommand: CommandModule = {
  command: 'print-tree <file>',
  aliases: ['pt'],
  builder: (yargs) =>
    yargs.positional('file', {
      describe: 'Input markdown file.',
      type: 'string',
    }),
  handler: (argv) => {
    printMdastTree(argv.file as string);
  },
};

export function createParser() {
  const parser = yargs(hideBin(process.argv))
    .command(indexCommand)
    .command(printTreeCommand)
    .command(fetchIconsCommand)
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

export function printMdastTree(filename: string) {
  const data = fs.readFileSync(filename);
  const parsed = remark().parse(data);
  parsed.children.forEach((child) => console.log(child));
}
