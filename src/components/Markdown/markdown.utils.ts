// generates a new component type that is a MUI Typography component with specified variant

import { Content, Heading, Image, Paragraph, Parent, Root, Text } from 'mdast';

type TreeNode = Parent | Content;
export function listAllNodes(tree: TreeNode): TreeNode[] {
  if (Object.hasOwn(tree, 'children')) {
    const parent = tree as Parent;
    return [tree].concat(...parent.children.map(listAllNodes));
  }
  return [tree];
}

export function getByType(tree: Root, nodeType: string) {
  const elements = listAllNodes(tree).filter(
    (value) => value.type === nodeType,
  );
  return elements as TreeNode[];
}

export function getImages(tree: Root) {
  return getByType(tree, 'image') as Image[];
}

export function getHeadings(tree: Root) {
  return getByType(tree, 'heading') as Heading[];
}

export function getFirstHeadingText(tree: Root) {
  const headingNodes = getHeadings(tree);
  if (headingNodes.length === 0) return '';
  const textNodes = headingNodes[0].children.filter(
    (value) => value.type === 'text',
  ) as Text[];

  return textNodes.map((x) => x.value).join('\n\n');
}

export function firstParText(tree: Root) {
  const paragraphNodes = getByType(tree, 'paragraph') as Paragraph[];
  if (paragraphNodes.length === 0) return '';

  const textNodes = paragraphNodes[0].children.filter(
    (value) => value.type === 'text',
  ) as Text[];

  return textNodes.map((x) => x.value).join('\n\n');
}
