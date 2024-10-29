import { Widget } from "../xjs/Widget";

//widget with delayed initialization
export default class WidgetB extends Widget {
  originalContent = "";
  constructor() {
    super();
  }
  async init(node, done) {
    super.init(node);
    this.originalContent = node.innerHTML;

    setTimeout(() => {
      if (this.node) {
        this.node.innerHTML += " Initialized after 3sec";
      }
      super.postInit(done);
    }, 3000);
  }
  destroy() {
    if (this.node) {
      this.node.innerHTML = this.originalContent;
    }
    super.destroy();
  }
}
