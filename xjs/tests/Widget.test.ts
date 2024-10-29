import { Widget } from "../Widget";
import { getTestWidgetNode } from "./testUtils";

describe("Widget", () => {
  const initializedMsg = "Initialized Widget";
  const destroyedMsg = "Destroyed Widget";

  class MockWidget extends Widget {
    constructor() {
      super();
    }
    async init(node: Element, done: Function) {
      super.init(node);
      if (this.node) {
        this.node.innerHTML = initializedMsg;
      }
      super.postInit(done);
    }

    destroy() {
      if (this.node) {
        this.node.innerHTML = destroyedMsg;
      }
      super.destroy();
    }
  }

  it("should properly init", () => {
    const mockFn = jest.fn();
    const widget = getTestWidgetNode();
    const widgetInstance = new MockWidget();
    widgetInstance.init(widget, mockFn);
    expect(widget.innerHTML).toEqual(initializedMsg);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should properly destroy", () => {
    const mockFn = jest.fn();
    const widget = getTestWidgetNode();
    const widgetInstance = new MockWidget();
    widgetInstance.init(widget, mockFn);
    widgetInstance.destroy();
    expect(widget.innerHTML).toEqual(destroyedMsg);
  });
});
