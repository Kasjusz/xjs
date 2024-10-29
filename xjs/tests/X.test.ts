import X from "../X";
import WidgetA from "../../widget/a";
import { XState } from "../utils";
import { getTestWidgetNode } from "./testUtils";

describe("X", () => {
  const mockResolver = () => {
    return Promise.resolve(WidgetA);
  };

  const xInstance = new X({ resolver: mockResolver });

  it("should initialize widget correctly", async () => {
    const widget = getTestWidgetNode();
    const doneFn = jest.fn();
    await xInstance.init(widget, doneFn);
    expect(widget.getAttribute("x")).toEqual(XState.doneTree);
    expect(doneFn).toHaveBeenCalledTimes(1);
  });

  it("should destroy widget", async () => {
    const widget = getTestWidgetNode();
    await xInstance.init(widget);
    xInstance.destroy(widget);
    expect(widget.getAttribute("x")).toEqual(null);
  });
});
