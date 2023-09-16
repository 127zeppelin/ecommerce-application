import Component from '../../temlates/components'
import { CSS_CLASSES } from '../../constants/cssclases'
import {
  logoutAndRedirect,
  isTheUserLoggedIn,
} from '../../pages/login/istheuserlogged'

class Header extends Component {
  private createPageButtons(href: string, text: string,  html: string|undefined) {
    const pageButton = document.createElement('div')
    const menuBtn = document.createElement('a')
    pageButton.className = CSS_CLASSES.menuBtn
    menuBtn.setAttribute('href', href)

    if(text !== ''){menuBtn.innerText = text}
    if(html){menuBtn.innerHTML = `<img src="${html}">`}
    menuBtn.setAttribute('id', `btn-${href.slice(1)}`)
    pageButton.append(menuBtn)
    return pageButton
  }
  // eslint-disable-next-line
  renderPageButtons(hash: string) {
    const currentHeader = document.querySelector('.header .container')
    if (currentHeader) {
      currentHeader.remove()
    }

    const title = this.createContainer()
    const pageButtons = document.createElement('div')
    pageButtons.className = 'menu_wrapper'

    const mainPageButton: HTMLElement = this.createPageButtons('#main', 'Main',undefined)
    pageButtons.append(mainPageButton)

    const carsButton = this.createPageButtons('#cars', 'Cars', undefined)
    pageButtons.append(carsButton)

    const aboutButton = this.createPageButtons('#about', 'About us', undefined)
    pageButtons.append(aboutButton);

    const loginPageButton = this.createPageButtons('#login', 'Log in', undefined)
    if (!isTheUserLoggedIn()) {
      pageButtons.append(loginPageButton)
    }

    const registrPageButton = this.createPageButtons('#registration', 'Sign up', undefined)
    if (!isTheUserLoggedIn()) {
      pageButtons.append(registrPageButton)
    }

    const userPageButton = this.createPageButtons('#user', 'User Page', undefined)
    if (isTheUserLoggedIn()) {
      pageButtons.append(userPageButton)
    }

    const logautButton = this.createPageButtons('#main', 'Logout', undefined)
    if (isTheUserLoggedIn()) {
      logautButton.addEventListener('click', logoutAndRedirect)
      pageButtons.append(logautButton)
    }
    const CardButton = this.createPageButtons('#cart', '','./images/cart-full.svg')
    pageButtons.append(CardButton)


    title.append(pageButtons)
    this.container.append(title)
  }

  render() {
    const hash = window.location.hash.slice(1)
    this.renderPageButtons(hash)
    return this.container
  }
}

export default Header
