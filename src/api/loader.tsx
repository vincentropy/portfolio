import { ComponentType, useEffect, useState } from 'react';

export function withLoader<P extends { data?: D }, D>(
  Component: ComponentType<P>,
  loaderFunction: (url: string) => Promise<D>,
) {
  return (hocProps: Omit<P, 'data'> & { url: string }) => {
    const { url, ...passThroughProps } = { ...hocProps };
    const [data, setData] = useState<D | null>(null);

    useEffect(() => {
      async function populate() {
        try {
          const data = await loaderFunction(url);
          setData(data);
        } catch (e) {
          const error = e as Error;
          console.log(error.message);
        }
      }
      populate();
    }, [url]);

    return <Component {...({ data, ...passThroughProps } as unknown as P)} />;
  };
}
