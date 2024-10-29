import { defaultResolver } from "./resolver";
import { initNode } from "./init";
import { destroyNode } from "./destroy";
import { Widget } from "./Widget";

export interface XInitData {
  resolver: Function;
  instanceMap: Map<Element, any>;
  initStatusList: string[];
}
export interface XDestroyData {
  instanceMap: Map<Element, any>;
}

export default class X {
  resolver: Function;
  instanceMap: Map<Element, Widget>;
  initStatusList: string[];

  constructor({ resolver }: { resolver?: Function } = {}) {
    this.resolver = resolver ?? defaultResolver;
    this.instanceMap = new Map();
    this.initStatusList = [];
  }

  async init(root: Element, callback?: (arg: string[]) => void) {
    this.initStatusList = [];
    await initNode(root, {
      resolver: this.resolver,
      instanceMap: this.instanceMap,
      initStatusList: this.initStatusList,
    });
    callback?.(this.initStatusList);
  }

  destroy(root: Element) {
    if (!root) {
      return;
    }
    destroyNode(root, { instanceMap: this.instanceMap });
  }

  callAction(node: Element, method: "setDone" | "setFail") {
    if (!node) {
      return "Incorrect element";
    }
    const instance = this.instanceMap.get(node);
    if (!instance) {
      return "Widget not initialized";
    }
    if (instance && instance[method]) {
      return instance[method]();
    }
    return "Method not supported";
  }

  callDone(node: Element) {
    return this.callAction(node, "setDone");
  }
  callFail(node: Element) {
    return this.callAction(node, "setFail");
  }
}
