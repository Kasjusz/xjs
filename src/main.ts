import X from "../xjs/X";
const x = new X();

function addLogs(logs: string[]) {
  const logContainer = document.querySelector("#logs");
  logs.forEach((log) => {
    logContainer!.innerHTML += `<li class="log">${log}</li>`;
  });
}

const done = (logs: string[]) => {
  addLogs(logs);
};

function getParentList(rootNode: HTMLElement, child: HTMLElement) {
  let currentElement: HTMLElement = child;
  const list = [currentElement];
  while (currentElement !== rootNode) {
    currentElement = currentElement.parentNode as HTMLElement;
    list.push(currentElement);
  }
  return list.reverse();
}

function parentListToSelector(list: HTMLElement[]) {
  let selector = "";
  list.forEach((item, i) => {
    const isSingleChild = i > 0 && list[i - 1].children.length === 1;
    if (item.id) {
      selector += `#${item.id}`;
    } else if (!isSingleChild) {
      const siblings = [...list[i - 1].children];
      const childIndex = siblings.findIndex((child) => child === item) + 1;
      selector += `${item.nodeName}:nth-of-type(${childIndex})`;
    } else {
      selector += item.nodeName;
    }
    if (i !== list.length - 1) {
      selector += " > ";
    }
  });
  return selector;
}

function getActiveSelector() {
  const rootNode = document.querySelector("#app") as HTMLElement;
  const activeElement = document.querySelector(".active") as HTMLElement;
  const list = getParentList(rootNode, activeElement);
  return parentListToSelector(list);
}

function handleClick(e: any) {
  const activeElement = document.querySelector(".active");
  if (activeElement) {
    activeElement.classList.remove("active");
  }
  e.target.classList.add("active");
  document.querySelector("#selector")!.textContent = getActiveSelector();
}

document.querySelector("#app")?.addEventListener("click", handleClick);

function getActiveNode() {
  const node = document.querySelector(".active");
  return node;
}

function callInit() {
  const node = getActiveNode();
  addLogs([`Initializing node ${getActiveSelector()}`]);
  if (!node) {
    return;
  }
  x.init(node, done);
}

function callDestroy() {
  const node = getActiveNode();
  if (!node) {
    return;
  }
  addLogs([`Destroying node ${getActiveSelector()}`]);
  x.destroy(node);
}

function callDone() {
  const node = getActiveNode();
  if (!node) {
    return;
  }
  const result = x.callDone(node);
  if (result) {
    addLogs([result]);
  }
}

function callFail() {
  const node = getActiveNode();
  if (!node) {
    return;
  }
  const result = x.callFail(node);
  if (result) {
    addLogs([result]);
  }
}

document.querySelector("#init")?.addEventListener("click", callInit);
document.querySelector("#destroy")?.addEventListener("click", callDestroy);
document.querySelector("#done")?.addEventListener("click", callDone);
document.querySelector("#fail")?.addEventListener("click", callFail);
