import { Widget } from "../xjs/Widget";

//widget with basic node manipulation
export default class WidgetA extends Widget {
  constructor() {
    super();
  }
  async init(node: Element, done: Function) {
    super.init(node);
    if (this.node) {
      this.node.classList.add("bold");
    }
    super.postInit(done);
  }

  destroy() {
    if (this.node) {
      this.node.classList.remove("bold");
    }
    super.destroy();
  }
}
