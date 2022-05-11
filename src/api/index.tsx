import axios from 'axios';
export { withLoader } from './loader';

export async function loadMarkdownFile(url: string) {
  // simulate loading time
  if (process.env.NODE_ENV === 'development') {
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 2000));
  }
  const loadPath = process.env.PUBLIC_URL + '/content/' + url;
  const response = await axios.get(loadPath);
  const data = response.data;

  return data;
}

export type Page = { filename: string; tall?: boolean };
export type IndexData = {
  pages: Page[];
  title: string;
};

export async function loadIndex(url: string): Promise<IndexData> {
  // simulate loading time
  if (process.env.NODE_ENV === 'development') {
    await new Promise((r) => setTimeout(r, 2000 + Math.random() * 2000));
  }
  const loadPath = process.env.PUBLIC_URL + url;
  const response = await axios.get(loadPath);
  return response.data;
}
