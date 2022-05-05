import axios from 'axios';

export async function loadMarkdownFile(name: string) {
  console.log('calling lmf');

  try {
    // simulate loading time
    await new Promise((r) => setTimeout(r, Math.random() * 2000));
    const url = process.env.PUBLIC_URL + '/content/' + name;
    const response = await axios.get(url);
    const data = response.data;

    return data;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export type Page = { filename: string };
export type IndexData = {
  pages: Page[];
  title: string;
};

export async function loadIndex(): Promise<IndexData> {
  const loadPath = process.env.PUBLIC_URL + '/content_index.json';
  const response = await axios.get(loadPath);
  const data = response.data;
  return data;
}
