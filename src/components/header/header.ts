import { PageIds } from "../../Enums/PageIds";
import Component from "../../temlates/components";

class Header extends Component {
  // constructor(tagName: string, className: string) {
  //   super(tagName, className);
  // }

  private createPageButtons(href: string, text: string) {
    const pageButton = document.createElement("div");
    const loginBtn = document.createElement("a");
    pageButton.className = "menu__btn";
    loginBtn.href = href;
    loginBtn.innerText = text;
    pageButton.append(loginBtn);
    return pageButton;
  }

  renderPageButtons(hash: string) {
    const currentHeader = document.querySelector(".header .container");
    if (currentHeader) {
      currentHeader.remove();
    }
    const title = this.createContainer();
    const pageButtons = document.createElement("div");
    pageButtons.className = "menu_wrapper";
    if (hash === PageIds.MAIN_PAGE || !hash) {
      let pageButton = this.createPageButtons("#login", "Log in");
      pageButtons.append(pageButton);
      pageButton = this.createPageButtons("#registration", "Sign up");
      pageButtons.append(pageButton);
    } else if (hash === PageIds.LOGIN_PAGE || hash === PageIds.REGISRATION_PAGE) {
      const pageButton = this.createPageButtons("#main", "Main");
      pageButtons.append(pageButton);
      const catalogButton = this.createPageButtons("#cars", "Cars");
      pageButtons.append(catalogButton);
      pageButtons.append(pageButton);
    }
    title.append(pageButtons);
    this.container.append(title);
  }

  render() {
    const hash = window.location.hash.slice(1);
    this.renderPageButtons(hash);
    return this.container;
  }
}

export default Header;
