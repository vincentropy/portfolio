import axios from 'axios';
import fs from 'fs/promises';
import { Link } from 'mdast';
import path from 'path';
import { remark } from 'remark';
import { CommandModule } from 'yargs';
import { getByType } from '../components/Markdown/markdown.utils';
import { urlToHost } from '../util';

export const fetchIconsCommand: CommandModule = {
  command: 'fetch-icons',
  aliases: ['fi'],
  builder: (yargs) =>
    yargs
      .option('targetPath', {
        describe: 'Where to put the images',
        type: 'string',
      })
      .option('mdPath', {
        describe: 'Location of the markdown files to process.',
        type: 'string',
        default: undefined,
      })
      .option('domain', {
        describe: 'single domain to fetch',
        type: 'string',
        default: undefined,
      })
      .demandOption('targetPath'),
  handler: (argv) => {
    fetchIcons(
      argv.targetPath as string,
      argv.mdPath as string | undefined,
      argv.domain as string | undefined,
    );
  },
};

export async function getLinksFromText(markdown: string) {
  const tree = remark().parse(markdown);
  return getByType(tree, 'link');
}

async function fileExists(path: string): Promise<boolean> {
  return Boolean(await fs.stat(path).catch((e) => false));
}

export async function fetchIcon(domain: string, targetPath: string) {
  const targetFile = path.join(targetPath, domain + '.png');

  if (await fileExists(targetFile)) return false;

  const response = await axios.get(`https://icon.horse/icon/${domain}`, {
    responseType: 'arraybuffer',
  });
  if (response.status !== 200) return false;
  await fs.writeFile(targetFile, response.data);

  return true;
}

export async function getLinksFromPath(mdPath: string) {
  const files = (await fs.readdir(mdPath)).filter((value) =>
    value.endsWith('.md'),
  );
  const pageData = await Promise.all(
    files.map((value) =>
      fs.readFile(mdPath + value, {
        encoding: 'utf8',
      }),
    ),
  );
  const nestedLinks = await Promise.all(
    pageData.map((page) => getLinksFromText(page)),
  );
  return nestedLinks.flat() as Link[];
}

export async function fetchIcons(
  targetPath: string,
  mdPath?: string,
  domain?: string,
) {
  console.log('fetching icons...');

  if (domain) return await fetchIcon(domain, targetPath);
  if (!mdPath) {
    console.log('mdPath is required if domain is not provided');
    return;
  }

  const allLinks = await getLinksFromPath(mdPath);
  const domains = allLinks.map((value) => value.url).map(urlToHost);
  const uniqueDomains = [
    ...new Set(domains.filter((host: string) => host !== '')),
  ];

  await Promise.all(
    uniqueDomains.map((domain) => fetchIcon(domain, targetPath)),
  );

  console.log('done.');
}
