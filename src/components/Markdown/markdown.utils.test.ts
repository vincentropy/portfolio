import { getImages, listAllNodes, firstParText } from './markdown.utils';
import { remark } from 'remark';

const testContent = `
# header

![my image](https://example.com/my_image_url.png "image title")
some text after the image. This can be a longer paragraph.
That spans multiple lines

# second header
## sub header

more text
![another image](https://example.com/my_image_url.png "another image title")

`;

test('image components are found', async () => {
  const tree = await remark().parse(testContent);
  const imageElements = getImages(tree);

  expect(imageElements.length).toEqual(2);
  expect(imageElements[0].title).toEqual('image title');
});

test('returns empty if no images present', async () => {
  const tree = await remark().parse('no images here');
  const imageElements = getImages(tree);

  expect(imageElements.length).toEqual(0);
});

test('list of nodes is generated', async () => {
  const tree = await remark().parse(testContent);

  const allNodes = listAllNodes(tree);

  expect(allNodes.length).toBeGreaterThan(0);
  expect(allNodes[0].type).toEqual('root');
});

test('first paragraph text is extracted', async () => {
  const tree = await remark().parse(testContent);

  const text = firstParText(tree);

  expect(text.length).toBeGreaterThan(0);
  expect(text.search('text after the image')).toBeGreaterThan(0);
});

test('unformatted one-line returns its self', async () => {
  const testText = 'unformatted text';
  const tree = await remark().parse(testText);

  const text = firstParText(tree);

  expect(text).toEqual(testText);
});
