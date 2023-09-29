import Page from '../../temlates/page'
import { CSS_CLASSES } from '../../constants/cssClases'
import { createEl, createHtmlElement } from '../../utils/createElement'
import { getCar, createCarPage } from './getCar'
import { ClientResponse, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import { getHashValue } from '../../utils/gethashvalue'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

class CarPage extends Page {
 

  async getcarquery(containerMain: HTMLElement) {
    const hash = getHashValue()
    try {
      const loadCarResult: ClientResponse<ProductProjection> = await getCar(hash)
      const carData: ProductProjection = loadCarResult.body
      createCarPage(carData, containerMain)
    } catch (error: any) {
      const errorMessage: string = error.message;
        resolveMessageAddAndRemove( errorMessage, false)
    }
  }

  render() {
    const containerMain: HTMLElement = createEl('main', [CSS_CLASSES.mainContainer])
    this.container.append(containerMain)

    const titleContainer: HTMLElement = createEl('div', [CSS_CLASSES.titleCont])
    containerMain.append(titleContainer)

    const title: HTMLHeadingElement =  createEl('h1', [CSS_CLASSES.pageTitle], 'Rent one of our cool cars.')
    titleContainer.append(title)

    const backBtnContainer = createEl('div',[CSS_CLASSES.backBtnContainer])
    containerMain.append(backBtnContainer)

    const backBtn: HTMLElement = createEl('button', [CSS_CLASSES.backBtn], '< Back', undefined, 
    ()=>{window.history.back();})
    backBtnContainer.append(backBtn);
    this.getcarquery(containerMain)
    return this.container
  }
}

export default CarPage
