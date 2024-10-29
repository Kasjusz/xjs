import { setXState, removeXState, XState } from "./utils";

function bindHandlers(object: Widget) {
  const prototype = Object.getPrototypeOf(object);
  const handlers = Object.getOwnPropertyNames(prototype).filter((prop) =>
    prop.endsWith("Handler")
  );
  handlers.forEach((handlerName) => {
    const handler = prototype[handlerName];
    if (typeof handler === "function") {
      prototype[handlerName] = prototype[handlerName].bind(object);
    }
  });
  if (Object.getPrototypeOf(prototype)) {
    bindHandlers(prototype);
  }
}

export class Widget {
  node: Element | null = null;
  constructor() {
    bindHandlers(this);
  }
  init(target: Element, done?: Function) {
    this.node = target;
    done?.();
  }
  async postInit(done: Function) {
    if (this.node) {
      setXState(this.node, XState.done);
      await done();
      this.initChildrenDone();
    } else {
      console.log("Widget destroyed");
    }
  }
  initChildrenDone() {
    setXState(this.node, XState.doneTree);
  }
  destroy() {
    removeXState(this.node);
    this.node = null;
  }

  setDone(): any {
    return "Done not supported by widget";
  }
  setFail(): any {
    return "Fail not supported by widget";
  }
}
