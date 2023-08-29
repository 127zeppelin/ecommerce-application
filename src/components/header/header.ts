import Component from '../../temlates/components'
import {
  logoutAndRedirect,
  isTheUserLoggedIn,
} from '../../pages/login/istheuserlogged'

class Header extends Component {
  // constructor(tagName: string, className: string) {
  //   super(tagName, className);
  // }

  private createPageButtons(href: string, text: string) {
    const pageButton = document.createElement('div')
    const loginBtn = document.createElement('button')
    pageButton.className = 'menu__btn'
    loginBtn.addEventListener('click', () => {
      window.location.href = href
    })
    loginBtn.innerText = text
    loginBtn.setAttribute('id', `btn-${href.slice(1)}`)
    pageButton.append(loginBtn)
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

    const mainPageButton: HTMLElement = this.createPageButtons('#main', 'Main')
    pageButtons.append(mainPageButton)

    const carsButton = this.createPageButtons('#cars', 'Cars')
    pageButtons.append(carsButton)

    const loginPageButton = this.createPageButtons('#login', 'Log in')
    if (!isTheUserLoggedIn()) {
      pageButtons.append(loginPageButton)
    }

    const registrPageButton = this.createPageButtons('#registration', 'Sign up')
    if (!isTheUserLoggedIn()) {
      pageButtons.append(registrPageButton)
    }

    const userPageButton = this.createPageButtons('#user', 'User Page')
    if (isTheUserLoggedIn()) {
      pageButtons.append(userPageButton)
    }

    const logautButton = this.createPageButtons('#main', 'Logout')
    if (isTheUserLoggedIn()) {
      logautButton.addEventListener('click', logoutAndRedirect)
      pageButtons.append(logautButton)
    }

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
