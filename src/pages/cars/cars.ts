import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'
import { CSS_CLASSES } from '../../constants/cssclases'
import { createCarsList, getCarsWithoutFilter } from './getproducts'
import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import {
  filerFromAtribute,
  filterCarsFromCategory,
  sortCars,
} from './carfilter'

class CarsPage extends Page {
  async loadCarsWithoutFilter(carsCardContainer: HTMLElement) {
    try {
      const loadCarsResult = await getCarsWithoutFilter()
      const carsArr: ProductProjection[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  async loadCarsWithFilter(
    carsCardContainer: HTMLElement,
    btnContainer: HTMLElement
  ) {
    //carsCardContainer.innerHTML = '';
    const categoryBtnsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.filerContainer],
    })
    btnContainer.append(categoryBtnsContainer)

    async function appendCategoryBtnContainer(container: HTMLElement) {
      const categoryBtns = await filterCarsFromCategory(carsCardContainer)
      container.append(categoryBtns)
    }
    appendCategoryBtnContainer(categoryBtnsContainer)

    const atributeBtnsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.filerContainer],
    })
    btnContainer.append(atributeBtnsContainer)
    const atributesBtns = filerFromAtribute(carsCardContainer)
    atributeBtnsContainer.append(atributesBtns)

    const sortBtnsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.filerContainer],
    })
    btnContainer.append(sortBtnsContainer)

    const sortContainer = sortCars(carsCardContainer)
    sortBtnsContainer.append(sortContainer)
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

    const optionsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.optionsContainer],
    })
    containerMain.append(optionsContainer)

    const cardsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cardsContainer],
    })

    this.loadCarsWithoutFilter(cardsContainer)
    containerMain.append(cardsContainer)
    this.loadCarsWithFilter(cardsContainer, optionsContainer)
    return this.container
  }
}

export default CarsPage
