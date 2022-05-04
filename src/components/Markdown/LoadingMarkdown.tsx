import { useEffect, useState } from 'react';

import { loadMarkdownFile } from '../../api';
import { MarkdownCard } from './MarkdownCard';

export function LoadingMarkdown(props: { name: string }) {
  const [data, setData] = useState('');

  useEffect(() => {
    async function populate() {
      const loadedData = await loadMarkdownFile(props.name);
      //   console.log(`current state: ${data}, new data: ${loadedData}`)
      setData(loadedData);
    }

    populate();
  }, [props.name]);

  return (
    <>
      {data === '' ? '' : <div data-testid="data-ready" />}
      <MarkdownCard markdown={data} />
    </>
  );
}
