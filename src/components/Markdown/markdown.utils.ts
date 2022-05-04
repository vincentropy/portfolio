// generates a new component type that is a MUI Typography component with specified variant

import { Content, Image, Paragraph, Parent, Root, Text } from 'mdast';

type TreeNode = Parent | Content;
export function listAllNodes(tree: TreeNode): TreeNode[] {
  if (Object.hasOwn(tree, 'children')) {
    const parent = tree as Parent;
    return [tree].concat(...parent.children.map(listAllNodes));
  }
  return [tree];
}

export function getImages(tree: Root) {
  const imgElements = listAllNodes(tree).filter(
    (value) => value.type === 'image',
  );
  return imgElements as Image[];
}

export function firstParText(tree: Root) {
  const paragraphNodes = listAllNodes(tree).filter(
    (value) => value.type === 'paragraph',
  ) as Paragraph[];

  if (paragraphNodes.length === 0) return '';
  console.log(paragraphNodes);

  const textNodes = paragraphNodes[0].children.filter(
    (value) => value.type === 'text',
  ) as Text[];

  return textNodes.map((x) => x.value).join('\n\n');
}
