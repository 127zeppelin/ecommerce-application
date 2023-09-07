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

class App {
  private container: HTMLElement = document.body

  private defaultPageId: string = 'current-page'

  private initialPage: MainPage

  private header: Header

  private footer: Footer

  handleInitialHash() {
    const initialHash = window.location.hash.slice(1); // Извлекаем хэш из URL
    this.renderNewPage(initialHash); // Вызываем метод для перерисовки страницы
    this.header.renderPageButtons(initialHash); // Обновляем кнопки в хедере
  }

  renderNewPage(idPage: string) {  
    const currentPageHTML = document.querySelector(`#${this.defaultPageId}`)
    const footer = document.querySelector('.footer')
    if (currentPageHTML) {
      currentPageHTML.remove()
    }
    let page: Page | null = null

    if (idPage === pageList.MAIN_PAGE) {
      page = new MainPage(idPage)
    } else if (idPage === pageList.LOGIN_PAGE) {
      page = new LoginPage(idPage)
    } else if (idPage === pageList.REGISRATION_PAGE) {
      page = new RegistrationPage(idPage)
    } else if (idPage === pageList.CUSTOMER_PAGE) {
      page = new CustomerPage(idPage)
    }  else if (idPage === pageList.CARS_PAGE) {
      page = new CarsPage(idPage)
      localStorage.removeItem('CUR_FILTER')
    } else if (idPage === pageList.CUR_CAR) {
      page = new CarPage(idPage)
    } else if (idPage === pageList.CUR_CAT) {
      page = new CarsPage(idPage)
    } else if (idPage === pageList.ERROR_PAGE) {
      page = new ErrorPage(idPage)
    }
    
    if (page) {
      const pageContext = page.render()
      pageContext.id = this.defaultPageId
      this.container.insertBefore(pageContext, footer)
    }
  }

  private enableRouting() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1)
      this.renderNewPage(hash)
      this.header.renderPageButtons(hash)
    })
  }

  constructor() {
    this.initialPage = new MainPage('main')
    this.header = new Header('header', 'header')
    this.footer = new Footer('footer', 'footer')
  }

  run() {
    let hash: string
    if (window.location.hash) {
      hash = window.location.hash.slice(1)
    } else {
      hash = 'main'
    }
    this.container.append(this.header.render())
    this.container.append(this.footer.render())
    this.renderNewPage(hash)
    this.enableRouting()
  }
}

export default App
