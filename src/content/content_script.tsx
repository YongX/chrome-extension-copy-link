import Button from "./button";

const button = Button.instance;
let timer: any = null;
let enabled: boolean = true;


function disableListener() {
  document.removeEventListener("mouseover", handleMouseOver);
}

function enableListener() {
  document.addEventListener("mouseover", handleMouseOver, { passive: true });
}

enableListener()

function handleMouseOver(event: MouseEvent) {
  event.stopPropagation();
  // 判断是否为 a 标签
  const target = event.target as HTMLElement;
  if (target.tagName === "A") {
    const domRect = target.getBoundingClientRect();
    const text = target.getAttribute("href") || "";
    if (text.startsWith("http")) {
      button.setData(text || "");
    } else if (text.startsWith("/")) {
      button.setData(location.origin + text);
    } else {
      return;
    }
    // 将新按钮放右边
    button.show(domRect);
  } else {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      button.hide();
    }, 3000);
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (enabled) {
      enabled = false;
      disableListener();
    } else {
      enabled = true;
      enableListener();
    }

    sendResponse(enabled);
  }
);
