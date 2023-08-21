import Component from "../../temlates/components";


class Footer extends Component {
  // constructor(tagName: string, className: string) {
  //   super(tagName, className);
  // }

  renderFooter() {
    // const logo = document.createElement("div");
    // const logoImg = document.createElement("img");
    // // logoImg.src = "../images/logo.png";
    // logoImg.src = "src/images/image.png";
    // logoImg.alt = "AutoCar";
    // logo.append(logoImg);
    // this.container.append(logo);
  }

  render() {
    const title = this.createContainer();
    this.container.append(title);
    this.renderFooter();
    return this.container;
  }
}

export default Footer;
