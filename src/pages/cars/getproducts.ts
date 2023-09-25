import { createHtmlElement } from '../../utils/createElement'
import { CSS_CLASSES } from '../../constants/cssClases'
import { pageList } from '../pagelist'
import { installOfTheCurrentPrice } from '../../utils/price'
import {
  Attribute,
  Image,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src'
import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/apiConstants'
import { pageIsEmpty } from '../../utils/cartIsEmptyMsg'

export const carCharacterBlock = (
  carData: ProductProjection,
  atributesContainer: HTMLElement
) => {
  const arrayAtributs: Attribute[] | undefined =
    carData.masterVariant.attributes
  if (arrayAtributs !== undefined) {
    for (const attribute of arrayAtributs) {
      const attributeName = attribute.name
      const attributeValue = attribute.value
      if (
        attributeName === 'number-of-seats' ||
        attributeName === 'engine-power' ||
        attributeName === 'max-speed'
      ) {
        const atributeContainer = createHtmlElement({
          tagName: 'div',
          cssClass: [CSS_CLASSES.carAtributeContainer],
        })
        const atributeImg = createHtmlElement({
          tagName: 'img',
          cssClass: [CSS_CLASSES.carAtributeImg],
          srcAtribute: `./images/${attributeName}.svg`,
        })
        atributeContainer.append(atributeImg)
        const atributeName = createHtmlElement({
          tagName: 'span',
          cssClass: [CSS_CLASSES.carCharacterCont],
          elementText:
            attributeName.charAt(0).toUpperCase() +
            attributeName.slice(1).replace(/-/g, ' '),
        })
        atributeContainer.append(atributeName)
        const atributeValue = createHtmlElement({
          tagName: 'span',
          cssClass: [CSS_CLASSES.carCharacterCont],
          elementText: String(attributeValue),
        })
        atributeContainer.append(atributeValue)

        const atributeValueAfter = createHtmlElement({
          tagName: 'span',
          cssClass: [CSS_CLASSES.carCharacterCont],
          elementText:
            attributeName === 'engine-power'
              ? 'HP'
              : attributeName === 'max-speed'
                ? 'Km/h'
                : '',
        })
        atributeContainer.append(atributeValueAfter)
        atributesContainer.append(atributeContainer)
      }
    }
  }
}

export const createCarsList = (
  carsArr: ProductProjection[],
  carsCardContainer: HTMLElement
): HTMLElement => {
  for (const carData of carsArr) {
    const childElementsCarCard = []
    const oneCarCardContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCard],
    })
    carsCardContainer.append(oneCarCardContainer)

    const productImages: Image[] | undefined = carData.masterVariant.images
    if (productImages !== undefined) {
      const carTbImg = createHtmlElement({
        tagName: 'img',
        cssClass: [CSS_CLASSES.carCardTb],
        srcAtribute: productImages[0].url,
        altAtribute: carData.name['en-US'],
      })
      childElementsCarCard.push(carTbImg)
    }
    const carPriceBlock = installOfTheCurrentPrice(carData)
    childElementsCarCard.push(carPriceBlock)

    const carTitle = createHtmlElement({
      tagName: 'h2',
      cssClass: [CSS_CLASSES.carCardTitle],
      elementText: carData.name['en-US'],
    })
    childElementsCarCard.push(carTitle)

    const сarСharacteristicsCont = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCharacterCont],
    })

    childElementsCarCard.push(сarСharacteristicsCont)
    const moreInfoLink = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.moreInfoBtn],
      elementText: 'Details',
      dataCarAtribute: carData.key,
    })
    if (carData.key !== undefined && pageList.CUR_CAR !== undefined) {
      moreInfoLink.addEventListener('click', () => {
        pageList.CUR_CAR = carData.key as string
        window.location.href = `#${pageList.CUR_CAR}`
      })
    }
    childElementsCarCard.push(moreInfoLink)
    oneCarCardContainer.append(...childElementsCarCard)
    carCharacterBlock(carData, сarСharacteristicsCont)
  }
  if(carsArr.length === 0){
    const pageIsEmptyMsq: string = `No cars match your<br/>filtering settings :(`
    pageIsEmpty(carsCardContainer, pageIsEmptyMsq)
  }
  return carsCardContainer
}

export const getCarsWithoutFilter = () => {
  const filterValues = localStorage.getItem('CUR_FILTER')
  const parsedData = filterValues ? JSON.parse(filterValues) : {}
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .search()
    .get(parsedData)
    .execute()
}
