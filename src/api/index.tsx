import axios from 'axios';

export async function loadMarkdownFile(name: string) {
  const response = await axios.get(`${window.location.href}content/${name}`);
  const data = response.data;
  return data;
}

export type Page = { filename: string };

export async function loadIndex(): Promise<Page[]> {
  const response = await axios.get(`${window.location.href}content_index.json`);
  const data = response.data.pages;
  return data;
}
