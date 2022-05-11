import {
  getImages,
  listAllNodes,
  firstParText,
  filterTree,
} from './markdown.utils';
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

test('filterTree removes element from tree', async () => {
  const tree = await remark().parse(testContent);

  const filtered = filterTree(tree, 'image', 1);
  const unfilteredNodeList = listAllNodes(tree);
  const filteredNodeList = listAllNodes(filtered.tree);

  expect(filteredNodeList.length).toEqual(
    unfilteredNodeList.length - filtered.removed.length,
  );
});

test('filterTree removes the correct type', async () => {
  const tree = await remark().parse(testContent);

  const filtered = filterTree(tree, 'image', 100);
  const filteredNodeList = listAllNodes(filtered.tree);

  expect(filteredNodeList.filter((node)=>node.type==='image')).toHaveLength(0)
  expect(filtered.removed).toHaveLength(2)
});

test('filterTree limits to @count nodes', async () => {
  const tree = await remark().parse(testContent);
  const count=1

  const filtered = filterTree(tree, 'image', count);

  expect(filtered.removed).toHaveLength(count)
});
