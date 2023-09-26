import Page from '../../temlates/page'
import { CSS_CLASSES } from '../../constants/cssClases'
import { createHtmlElement } from '../../utils/createElement'
import { getCar, createCarPage } from './getCar'
import { ClientResponse, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'

class CarPage extends Page {

  getHashValue() {
    const hashValue = window.location.hash.substring(1)
    return hashValue
  }

  async getcarquery(containerMain: HTMLElement) {
    const hash = this.getHashValue()
    try {
      const loadCarResult: ClientResponse<ProductProjection> = await getCar(hash)
      const carData: ProductProjection = loadCarResult.body
      createCarPage(carData, containerMain)
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  render() {
    const containerMain = createHtmlElement({
      tagName: 'main',
      cssClass: [CSS_CLASSES.mainContainer],
    })
    this.container.append(containerMain)
    const titleContainer: HTMLElement = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.titleCont],
    })
    containerMain.append(titleContainer)

    const title = this.createHeaderTitle('Rent one of our cool cars.')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)

    const backBtnContainer: HTMLElement = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.backBtnContainer],
    })
    containerMain.append(backBtnContainer)

    const backBtn: HTMLElement = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.backBtn],
      elementText: '< Back'
    })
    backBtn.addEventListener('click', function () {
      window.history.back();
    });
    backBtnContainer.append(backBtn);
    this.getcarquery(containerMain)
    return this.container
  }
}

export default CarPage
