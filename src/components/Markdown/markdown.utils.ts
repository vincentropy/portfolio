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

export function getHeadingImage(tree: Root) {
  const headingNodes = getHeadings(tree);
  for (const node of headingNodes) {
    for (const childNode of node.children) {
      if (childNode.type === 'image') return childNode as Image;
    }
  }
  return undefined;
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

export function shorten(markdown: string, maxChars: number): string {
  let charCounter = 0;
  if (markdown.length < maxChars) return markdown;

  const lines = markdown.split('\n');
  let numLinesToReturn = 1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    charCounter += line.replace(/\]\(.*\)/, '').length;
    if (charCounter > maxChars) {
      break;
    }
    numLinesToReturn += 1;
  }
  return lines.slice(0, numLinesToReturn).join('\n');
}

type FilteredTree = { tree: TreeNode; removed: Content[] };
/* 
Remove first @count elements of type @filterType from the tree. 
Also return removed elements as a list.
*/
export function filterTree(
  tree: TreeNode,
  filterType: string,
  count = 1,
): FilteredTree {
  const newTree = { ...tree };
  let removed: Content[] = [];
  if (!Object.hasOwn(tree, 'children')) return { tree: newTree, removed };

  const parent = newTree as Parent;
  removed = parent.children.filter((child) => child.type === filterType);
  const keep = parent.children.filter((child) => child.type !== filterType);

  // if there are more siblings of filterType than count, put them back.
  keep.push(...removed.slice(count));
  removed = removed.slice(0, count);

  parent.children = [];
  for (const child of keep) {
    const filteredChild = filterTree(child, filterType, count - removed.length);
    parent.children.push(filteredChild.tree as Content);
    removed.push(...filteredChild.removed);
  }
  return { tree: newTree, removed };
}
