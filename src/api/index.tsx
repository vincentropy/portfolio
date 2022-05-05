import axios from 'axios';
export { withLoader } from './loader';

export async function loadMarkdownFile(url: string) {
  // simulate loading time
  await new Promise((r) => setTimeout(r, Math.random() * 1000));
  const loadPath = process.env.PUBLIC_URL + '/content/' + url;
  const response = await axios.get(loadPath);
  const data = response.data;

  return data;
}

export type Page = { filename: string };
export type IndexData = {
  pages: Page[];
  title: string;
};

export async function loadIndex(url: string): Promise<IndexData> {
  const loadPath = process.env.PUBLIC_URL + url;
  const response = await axios.get(loadPath);
  return response.data;
}
