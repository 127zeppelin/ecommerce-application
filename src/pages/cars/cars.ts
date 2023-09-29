import Page from '../../temlates/page'
import { createEl } from '../../utils/createElement'
import { CSS_CLASSES } from '../../constants/cssClases'
import { createCarsList, getCarsWithoutFilter } from './getProducts'
import { ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import {
  filerFromAtribute,
  filterCarsFromCategory,
  sortCars,
} from './carFilter'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

class CarsPage extends Page {
  async loadCarsWithoutFilter(carsCardContainer: HTMLElement) {
    try {
      const loadCarsResult = await getCarsWithoutFilter()
      const carsArr: ProductProjection[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
    } catch (error: any) {
      const errorMessage: string = error.message;
      resolveMessageAddAndRemove( errorMessage, false)
    }
  }

  async loadCarsWithFilter(
    carsCardContainer: HTMLElement,
    btnContainer: HTMLElement
  ) {
    //carsCardContainer.innerHTML = '';
    const categoryBtnsContainer = createEl('div', [CSS_CLASSES.filerContainer])
    btnContainer.append(categoryBtnsContainer)

    async function appendCategoryBtnContainer(container: HTMLElement) {
      const categoryBtns = await filterCarsFromCategory(carsCardContainer)
      container.append(categoryBtns)
    }
    appendCategoryBtnContainer(categoryBtnsContainer)

    const atributeBtnsContainer = createEl('div', [CSS_CLASSES.filerContainer])
    btnContainer.append(atributeBtnsContainer)
    const atributesBtns = filerFromAtribute(carsCardContainer)
    atributeBtnsContainer.append(atributesBtns)

    const sortBtnsContainer = createEl('div',[CSS_CLASSES.filerContainer])
    btnContainer.append(sortBtnsContainer)

    const sortContainer = sortCars(carsCardContainer)
    sortBtnsContainer.append(sortContainer)
  }

  render() {
    const containerMain = createEl('main',[CSS_CLASSES.mainContainer])
    this.container.append(containerMain)

    const titleContainer: HTMLElement = createEl('div', [CSS_CLASSES.titleCont])
    containerMain.append(titleContainer)

    const title = createEl('h1', [CSS_CLASSES.pageTitle], 'Rent Our Cars')
    titleContainer.append(title)

    const optionsContainer = createEl('div', [CSS_CLASSES.optionsContainer])
    containerMain.append(optionsContainer)

    const cardsContainer = createEl('div', [CSS_CLASSES.cardsContainer])

    this.loadCarsWithoutFilter(cardsContainer)
    containerMain.append(cardsContainer)
    this.loadCarsWithFilter(cardsContainer, optionsContainer)
    return this.container
  }
}

export default CarsPage
