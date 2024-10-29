import { Widget } from "../xjs/Widget";

// widget with event listeners
export default class WidgetC extends Widget {
  onMouseOver(e) {
    e.target.classList.add("bold");
  }

  onMouseOut(e) {
    e.target.classList.remove("bold");
  }

  constructor() {
    super();
  }

  async init(node, done) {
    super.init(node);
    if (this.node) {
      this.node.addEventListener("mouseover", this.onMouseOver);
      this.node.addEventListener("mouseout", this.onMouseOut);
    }

    super.postInit(done);
  }
  destroy() {
    if (this.node) {
      this.node.removeEventListener("mouseover", this.onMouseOver);
      this.node.removeEventListener("mouseout", this.onMouseOut);
    }
    super.destroy();
  }
}
