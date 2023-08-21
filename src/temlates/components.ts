abstract class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  protected createContainer() {
    const cont = document.createElement("div");
    cont.className = "container";
    const logo = document.createElement("div");
    const logoImg = document.createElement("img");
    logoImg.src = "./images/image (1).png";
    logoImg.alt = "AutoCar";
    logo.append(logoImg);
    cont.append(logo);
    return cont;
  }

  render() {
    return this.container;
  }
}

export default Component;
