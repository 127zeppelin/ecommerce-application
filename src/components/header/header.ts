import Component from '../../temlates/components'
import { CSS_CLASSES } from '../../constants/cssClases'
import {
  logoutAndRedirect,
  isTheUserLoggedIn,
} from '../../pages/login/isTheUserLogged'
import { createHtmlElement } from '../../utils/createElement'
import { carInCartCounter } from './carsCounterInCart'
import { getHashValue } from '../../utils/gethashvalue'

class Header extends Component {
  private createPageLinks(href: string, text: string, html: string | undefined) {
    const pageButton = document.createElement('div')
    const menuLink = document.createElement('a')
    pageButton.className = CSS_CLASSES.menuLink
    menuLink.setAttribute('href', href)

    if (text !== '') { menuLink.innerText = text }
    if (html) { menuLink.innerHTML = `<img src="${html}">` }
    menuLink.setAttribute('id', `btn-${href.slice(1)}`)
    pageButton.append(menuLink)
    return pageButton
  }
  // eslint-disable-next-line
  async renderPageButtons(hash: string) {
    const currentHeader = document.querySelector('.header .container')
    if (currentHeader) {
      currentHeader.remove()
    }

    const title = this.createContainer()
    const pageLinks = document.createElement('div')
    pageLinks.className = 'menu_wrapper'

    const mainPageButton: HTMLElement = this.createPageLinks('#main', 'Main', undefined)
    pageLinks.append(mainPageButton)

    const carsButton = this.createPageLinks('#cars', 'Cars', undefined)
    pageLinks.append(carsButton)

    const aboutButton = this.createPageLinks('#about', 'About us', undefined)
    pageLinks.append(aboutButton);

    const loginPageButton = this.createPageLinks('#login', 'Log in', undefined)
    if (!isTheUserLoggedIn()) {
      pageLinks.append(loginPageButton)
    }

    const registrPageButton = this.createPageLinks('#registration', 'Sign up', undefined)
    if (!isTheUserLoggedIn()) {
      pageLinks.append(registrPageButton)
    }

    const userPageButton = this.createPageLinks('#user', 'User Page', undefined)
    if (isTheUserLoggedIn()) {
      pageLinks.append(userPageButton)
    }

    const logautButton = this.createPageLinks('#main', 'Logout', undefined)
    if (isTheUserLoggedIn()) {
      logautButton.addEventListener('click', logoutAndRedirect)
      pageLinks.append(logautButton)
    }
    const CartButton = this.createPageLinks('#cart', '', './images/cart-full.svg')
    pageLinks.append(CartButton)

    carInCartCounter();

    const burgerBtn = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.burgerBtn]
    })
    title.append(burgerBtn)

    burgerBtn.addEventListener('click', () => {
      pageLinks.classList.toggle('active');
      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }
    })
    pageLinks.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;
      if (clickedElement && clickedElement.tagName === 'A') {
        if (document.body.style.overflow === 'hidden') {
          document.body.style.overflow = 'auto';
        }
      }
    });
    const burgerLine = createHtmlElement({
      tagName: 'span',
      cssClass: [CSS_CLASSES.burgerLine]
    })
    burgerBtn.append(burgerLine)

    title.append(pageLinks)

    title.append(pageLinks)
    this.container.append(title)
  }

  render() {
    const hash = getHashValue()
    this.renderPageButtons(hash)
    return this.container
  }
}

export default Header
