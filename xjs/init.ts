import { getIsInitialized, getIsWidget, setXState, XState } from "./utils";
import { XInitData } from "./X";

export async function initChildNodes(node: Element, data: XInitData) {
  for (const childNode of node.children) {
    await initNode(childNode, data);
  }
}

export async function initNode(node: Element, data: XInitData) {
  const { resolver, instanceMap, initStatusList } = data;
  const isWidget = getIsWidget(node);
  const canInit = isWidget && !getIsInitialized(node);

  if (canInit) {
    const widgetName = node.getAttribute("widget");
    setXState(node, XState.pending);
    try {
      const WidgetClass = await resolver(widgetName);
      const instance = new WidgetClass();
      instanceMap.set(node, instance);
      instance.init(node, async () => {
        await initChildNodes(node, data);
      });
    } catch (err) {
      initStatusList.push(`Error: ${err}`);
      setXState(node, XState.failed);
    }
  }
  if (!isWidget) {
    await initChildNodes(node, data);
  }
}
