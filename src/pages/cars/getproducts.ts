import { createEl } from '../../utils/createElement'
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
import { pageIsEmpty } from '../../utils/cartIsemptyMsg'

export const carCharacterBlock = (
  carData: ProductProjection,
  atributesContainer: HTMLElement
) => {
  const arrayAtributs: Attribute[] | undefined =
    carData.masterVariant.attributes
  if (arrayAtributs !== undefined) {
    arrayAtributs.forEach((attribute)=>{
      const attributeName = attribute.name
      const attributeValue = attribute.value
      if (
        attributeName === 'number-of-seats' ||
        attributeName === 'engine-power' ||
        attributeName === 'max-speed'
      ) {
        const atributeContainer = createEl('div', [CSS_CLASSES.carAtributeContainer])
        const atributeImg = createEl('img', [CSS_CLASSES.carAtributeImg], undefined, [`./images/${attributeName}.svg`])
        atributeContainer.append(atributeImg)
        const elementText = attributeName.charAt(0).toUpperCase() + attributeName.slice(1).replace(/-/g, ' ');
        const atributeName = createEl('span', [CSS_CLASSES.carCharacterCont], elementText)
        atributeContainer.append(atributeName)
        const atributeValue = createEl('span', [CSS_CLASSES.carCharacterCont], String(attributeValue))
        atributeContainer.append(atributeValue)
        
        const atributeText = attributeName === 'engine-power' ? 'HP' : attributeName === 'max-speed' ? 'Km/h' : '';
        const atributeValueAfter = createEl('span', [CSS_CLASSES.carCharacterCont], atributeText)
        atributeContainer.append(atributeValueAfter)
        atributesContainer.append(atributeContainer)
      }
    })
  }
}

export const createCarsList = (
  carsArr: ProductProjection[],
  carsCardContainer: HTMLElement
): HTMLElement => {
  carsArr.forEach((carData)=>{
    const childElementsCarCard = []
    const oneCarCardContainer = createEl('div', [CSS_CLASSES.carCard]);
    carsCardContainer.append(oneCarCardContainer)

    const productImages: Image[] | undefined = carData.masterVariant.images
    if (productImages !== undefined) {
      const carTbImg = createEl('img', [CSS_CLASSES.carCardTb], undefined, 
        [productImages[0].url, carData.name['en-US']])
      childElementsCarCard.push(carTbImg)
    }
    const carPriceBlock = installOfTheCurrentPrice(carData)
    childElementsCarCard.push(carPriceBlock)

    const carTitle = createEl('h2', [CSS_CLASSES.carCardTitle], carData.name['en-US'])
    childElementsCarCard.push(carTitle)

    const сarСharacteristicsCont = createEl('div', [CSS_CLASSES.carCharacterCont])

    childElementsCarCard.push(сarСharacteristicsCont)
    const moreInfoLink = createEl('button', [CSS_CLASSES.moreInfoBtn], 'Details');
    if(carData.key){moreInfoLink.setAttribute('data', carData.key)}
    if (carData.key !== undefined && pageList.CUR_CAR !== undefined) {
      moreInfoLink.addEventListener('click', () => {
        pageList.CUR_CAR = carData.key as string
        window.location.href = `#${pageList.CUR_CAR}`
      })
    }
    childElementsCarCard.push(moreInfoLink)
    oneCarCardContainer.append(...childElementsCarCard)
    carCharacterBlock(carData, сarСharacteristicsCont)
  })
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
