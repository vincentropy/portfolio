import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGemoji from 'remark-gemoji';
import { loadMarkdownFile } from '../api';

export function LoadingMarkdown(props: { name: string }) {
  const [data, setData] = useState('');

  useEffect(() => {
    async function populate() {
      const data = await loadMarkdownFile(props.name);
      setData(data);
    }
    populate();
  }, [props.name]);

  return <ReactMarkdown remarkPlugins={[remarkGemoji]}>{data}</ReactMarkdown>;
}
