export enum XState {
  pending = "pending",
  done = "done",
  doneTree = "done-tree",
  failed = "failed",
}

export function getIsWidget(node: Element | null): boolean {
  if (node) {
    return node.hasAttribute("widget");
  }
  return false;
}

export function getIsInitialized(node: Element | null): boolean {
  if (node) {
    return node && node.hasAttribute("x");
  }
  return false;
}

export function getIsFailed(node: Element | null): boolean {
  if (node) {
    return node && node.getAttribute("x") === "failed";
  }
  return false;
}

export function setXState(node: Element | null, state: XState): void {
  if (node) {
    node.setAttribute("x", state);
  }
}

export function removeXState(node: Element | null): void {
  if (node) {
    node.removeAttribute("x");
  }
}
