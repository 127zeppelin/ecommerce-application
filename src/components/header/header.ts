import { PageIds } from "../../Enums/PageIds";
import Component from "../../temlates/components";


const Buttons = [
  {
    id: PageIds.MAIN_PAGE,
    text: "Main Page",
  },
  {
    id: PageIds.LOGIN_PAGE,
    text: "Login Page",
  },
  {
    id: PageIds.REGISRATION_PAGE,
    text: "Registration Page",
  },
]

class Header extends Component {
  // constructor(tagName: string, className: string) {
  //   super(tagName, className);
  // }

  renderPageButtons() {
    const title = this.createContainer();
    
    const pageButtons = document.createElement("div");
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement("a");
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    })
    title.append(pageButtons);

    this.container.append(title);
  }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
