import ClipboardJS from "clipboard";

class Button {
  private static _button: Button;
  private readonly _element: HTMLButtonElement;
  private readonly id: string = "CopyMe!!!!!";
  private readonly clipboard: any;
  private _active: boolean = false;

  private constructor() {
    this._element = this.createButton();
    this.clipboard = this.initClipboard();
  }

  static get instance(): Button {
    if (!Button._button) {
      Button._button = new Button();
    }
    return Button._button;
  }

  show({ right = 0, top = 0, height = 0 }) {
    this._element.style.display = "block";
    this._element.style.left = right + 20 + "px";
    // notice 这个 24 是 button 的高度
    this._element.style.top = top + (height - 24) / 2 + "px";
    this._active = true;

    this.element.innerText = "copy";
  }

  setData(text: string) {
    this._element.setAttribute("data-clipboard-text", text);
  }

  hide() {
    this._element.style.display = "none";
    this.setData("");
  }

  get element(): HTMLButtonElement {
    return this._element!;
  }

  get active(): boolean {
    return this._active;
  }


  private initClipboard() {
    const clipboard = new ClipboardJS(this._element);
    const element = this.element;

    clipboard.on("success", function(e) {
      // console.info("Action:", e.action);
      console.info("Text:", e.text);
      // console.info("Trigger:", e.trigger);
      element.innerText = "done";

      e.clearSelection();
    });

    clipboard.on("error", function(e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
    return clipboard;
  }

  private createButton() {
    const button = document.createElement("button");
    button.textContent = "copy";
    button.id = this.id;

    button.style.position = "fixed";
    button.style.left = "-10000px";
    button.style.display = "none";
    button.style.zIndex = "10000";
    button.style.padding = "2px 6px";
    button.style.height = "24px";
    button.style.boxSizing = "border-box";
    button.style.backgroundColor = "#eee";
    button.style.color = "#333";
    button.style.border = "1px solid #d5d5d5";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "4px";


    document.body.appendChild(button);
    console.log("createButton called");
    return button;
  }
}

export default Button;
