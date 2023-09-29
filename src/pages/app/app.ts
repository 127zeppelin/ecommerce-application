import { pageList } from '../pagelist'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Page from '../../temlates/page'
import LoginPage from '../login/login'
import MainPage from '../main/main'
import RegistrationPage from '../registration/registration'
import CustomerPage from '../user/user'
import ErrorPage from '../error/error'
import CarsPage from '../cars/cars'
import CarPage from '../car/car'
import CartPage from '../cart/cart'
import AboutPage from '../about/about'
import { getHashValue } from '../../utils/gethashvalue'

class App {
  private container: HTMLElement = document.body

  private defaultPageId: string = 'current-page'

  private header: Header

  private footer: Footer

  handleInitialHash() {
    const initialHash = getHashValue()
    this.renderNewPage(initialHash)
    this.header.renderPageButtons()
  }

  constructor() {
    this.header = new Header('header', 'header')
    this.footer = new Footer('footer', 'footer')
  }

  renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`)
    const footer = document.querySelector('.footer')
    if (currentPageHTML) {
      currentPageHTML.remove()
    }
    let page: Page | null = null;

    const pageMap = {
      [pageList.LOGIN_PAGE]: LoginPage,
      [pageList.REGISRATION_PAGE]: RegistrationPage,
      [pageList.CUSTOMER_PAGE]: CustomerPage,
      [pageList.MAIN_PAGE]: MainPage, 
      [pageList.CARS_PAGE]: CarsPage,
      [pageList.CUR_CAR]: CarPage,
      [pageList.CART_PAGE]: CartPage,
      [pageList.ERROR_PAGE]: ErrorPage,
      [pageList.ABOUT_PAGE]: AboutPage,
    };
    const pageClass = pageMap[idPage];
    
    if (pageClass) {
      page = new pageClass(idPage)
      if (idPage === pageList.CARS_PAGE) {
        localStorage.removeItem('CUR_FILTER');
      }
    } else {
      this.navigateToErrorPage();
    }

    if (page) {
      const pageContext = page.render()
      pageContext.id = this.defaultPageId
      this.container.insertBefore(pageContext, footer)
    }
  }

  private enableRouting() {
    window.addEventListener('popstate', () => {
      const hash = getHashValue()
      if (!hash) {
        this.navigateToErrorPage();
      } else if (!window.location.pathname.startsWith('/#') && window.location.pathname !== '/') {
        this.navigateToErrorPage();
      } else {
        this.renderNewPage(hash);
        this.header.renderPageButtons();
      }
    });
  }

  private navigateToErrorPage() {
    window.location.href = '#error';
  }

  run() {
    let hash: string = 'main';
    if (window.location.hash) {
      hash = getHashValue()
    } else if (window.location.pathname === '/' || window.location.pathname === '') {
      hash = 'main'
    }
    this.container.append(this.header.render())
    this.container.append(this.footer.render())
    this.renderNewPage(hash)
    this.enableRouting()
  }
}

export default App
