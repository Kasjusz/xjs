import {
  getIsFailed,
  getIsInitialized,
  getIsWidget,
  removeXState,
} from "./utils";
import { XDestroyData } from "./X";

export function destroyNode(node: Element, data: XDestroyData) {
  const { instanceMap } = data;
  const isFailed = getIsFailed(node);
  const canDestroy = getIsWidget(node) && getIsInitialized(node) && !isFailed;

  for (const childNode of node.children) {
    destroyNode(childNode, data);
  }

  if (isFailed) {
    removeXState(node);
  }
  if (canDestroy) {
    const instance = instanceMap.get(node);
    if (instance) {
      instance.destroy();
      instanceMap.delete(node);
    }
  }
}
