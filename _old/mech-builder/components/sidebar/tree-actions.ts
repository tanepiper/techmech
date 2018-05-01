import { IActionMapping } from 'angular-tree-component';

export function createActionMapping(parentClass): IActionMapping {
  return {
    mouse: {
      // click: (tree, node, $event) => {
      //   console.log(node, node.isLeaf);
      //   if (node.isLeaf) {
      //     parentClass.click.emit(node);
      //   }
      // },
      dblClick: (tree, node, $event) => {
        if (node.isLeaf) {
          parentClass.mechDblClick.emit(node);
        }
      }
    }
  };
}
