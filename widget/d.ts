import { Widget } from "../xjs/Widget";
import { setXState, XState } from "../xjs/utils";

const overwriteTemplate = `Widget d
    <div widget="widget/x">Widget/x</div>
    <div widget="widget/a">Widget/a</div>
   `;

// widget with some nested widgets, manually initialized/rejected with done/fail
export default class WidgetD extends Widget {
  originalContent;
  done;
  constructor() {
    super();
  }
  async init(node, done) {
    super.init(node);
    if (this.node) {
      this.originalContent = this.node.innerHTML;
    }
    this.done = done;
  }

  setDone() {
    if (this.node) {
      this.node.innerHTML = overwriteTemplate;
    }
    super.postInit(this.done);
  }
  setFail() {
    setXState(this.node, XState.failed);
  }
  destroy() {
    if (this.node) {
      this.node.innerHTML = this.originalContent;
    }
    super.destroy();
  }
}
