import Component from '../../temlates/components'
import { CSS_CLASSES } from '../../constants/cssClases'
import {
  logoutAndRedirect,
  isTheUserLoggedIn,
} from '../../pages/login/isTheUserLogged'
import { createEl } from '../../utils/createElement'
import { carInCartCounter } from './carsCounterInCart'
import { showAndHideMobileMenu } from '../../utils/showHideMobileMenu'
import { PageLinks } from '../../types/types'

class Header extends Component {
  private createPageLinks(href: string, text?: string | undefined) {
    const menuButton = createEl('div', [CSS_CLASSES.menuBtn]);
    const linkText = text !== '' ? text : undefined;
    const menuLink = createEl('a', undefined, linkText, [href]);
    menuLink.setAttribute('id', `btn-${href.slice(1)}`)
    if (text === 'Cart') { menuLink.innerHTML = `<img src="./images/cart-full.svg" alt="cart-icon">` }
    if (text === 'Logout') { menuLink.addEventListener('click', logoutAndRedirect) }
    menuButton.append(menuLink)
    return menuButton
  }

  async renderPageButtons() {
    const currentHeader = document.querySelector('.header .container')
    if (currentHeader) {
      currentHeader.remove()
    }

    const title = this.createContainer()
    const pageLinksContainer = createEl('div', [CSS_CLASSES.menuWrapper]);

    const pageLinks: PageLinks = {
      'Main': { url: '#main', login: undefined },
      'Cars': { url: '#cars', login: undefined },
      'About us': { url: '#about', login: undefined },
      'Log in': { url: '#login', login: false },
      'Sign up': { url: '#registration', login: false },
      'User Page': { url: '#user', login: true },
      'Logout': { url: '#main', login: true },
      'Cart': { url: '#cart', login: undefined },
    }
    const UserLoggedIn: boolean = isTheUserLoggedIn()
    for (const pageLink in pageLinks) {
      const loginOption: boolean | undefined = pageLinks[pageLink].login
      const pageButton: HTMLElement = this.createPageLinks(pageLinks[pageLink].url, pageLink)
      if (loginOption === undefined) { pageLinksContainer.append(pageButton) }
      else if (loginOption === true && UserLoggedIn) { pageLinksContainer.append(pageButton) }
      else if (loginOption === false && !UserLoggedIn) { pageLinksContainer.append(pageButton) }
    }
    carInCartCounter();

    const burgerBtn = createEl('div', [CSS_CLASSES.burgerBtn], undefined, undefined, showAndHideMobileMenu);
    title.append(burgerBtn)

    pageLinksContainer.addEventListener('click', (event) => {
      const clickedElement = event.target;
      if (clickedElement instanceof HTMLElement && clickedElement.tagName === 'A') {
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'auto';
        }
      }
    });
    const burgerLine = createEl('span', [CSS_CLASSES.burgerLine])
    burgerBtn.append(burgerLine)
    title.append(pageLinksContainer)
    title.append(pageLinksContainer)
    this.container.append(title)
  }

  render() {
    this.renderPageButtons()
    return this.container
  }
}

export default Header



