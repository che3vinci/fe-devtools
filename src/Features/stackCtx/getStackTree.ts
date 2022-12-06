import { isStackContextCreator } from './isStackContextCreator';

export type TreeNode = {
  node: HTMLElement;
  children: TreeNode[];
};

export const getStackTree = (root: HTMLElement): TreeNode => {
  //trasverse the dom tree
  if (isStackContextCreator(root)) {
    // return root;
  }
  for (const child of root.children) {
    //TODO:
  }
};
