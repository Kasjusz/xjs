import { getIsWidget, removeXState, setXState, XState } from "../utils";
import { getTestWidgetNode } from "./testUtils";

describe("utils", () => {
  describe("getIsWidget", () => {
    it("should return true if element has widget attribute", () => {
      const widget = getTestWidgetNode();
      expect(getIsWidget(widget)).toBeTruthy();
    });
    it("should return false if element has no widget attribute", () => {
      const element = document.createElement("div");
      expect(getIsWidget(element)).toBeFalsy();
    });
    it("should return false when no element provided", () => {
      expect(getIsWidget(null)).toBeFalsy();
    });
  });
  describe("setXState", () => {
    it("should properly set x attribute", () => {
      const element = document.createElement("div");
      const state = XState.done;
      setXState(element, state);
      expect(element.getAttribute("x")).toEqual(state);
    });
  });
  describe("removeXstate", () => {
    it("should properly remove x attribute", () => {
      const element = document.createElement("div");
      element.setAttribute("x", XState.done);
      removeXState(element);
      expect(element.getAttribute("x")).toEqual(null);
    });
  });
});
