import * as fetchIcons from './fetch-icons';


test('links from path returns links', async () => {
  const links = await fetchIcons.getLinksFromPath('./public/content/');

  expect(links.length).toBeGreaterThan(0)
  expect(links.every((item) => item.type === 'link')).toBeTruthy();
});


 