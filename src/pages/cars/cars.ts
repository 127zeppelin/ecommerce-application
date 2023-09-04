import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'
import { CSS_CLASSES } from '../../constants/cssclases'
import { getCars, createCarsList } from './getproducts'
// import { Car, CarResponse } from '../../types/types'
import { Product } from '@commercetools/platform-sdk/dist/declarations/src' 

class CarsPage extends Page {
  async loadCarsWithoutCategory(carsCardContainer: HTMLElement) {
    try {
      const loadCarsResult  = await getCars()
      const carsArr: Product[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
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

    const title = this.createHeaderTitle('Rent Our Cars')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)

    const cardsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cardsContainer],
    })
    this.loadCarsWithoutCategory(cardsContainer)
    containerMain.append(cardsContainer)
    return this.container
  }
}

export default CarsPage
