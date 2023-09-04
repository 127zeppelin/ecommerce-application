import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import { createHtmlElement } from '../../utils/createelement'
import { CSS_CLASSES } from '../../constants/cssclases'
import { pageList } from '../pagelist'
import { installOfTheCurrentPrice } from '../../utils/price'
import { Product, Attribute, Image } from '@commercetools/platform-sdk/dist/declarations/src' 

export const getCars = () => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .products()
    .get()
    .execute()
}

const carCharacterBlock = (carData: Product, atributesContainer: HTMLElement) => {
  const arrayAtributs: Attribute[] | undefined = carData.masterData.current.masterVariant.attributes
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
          elementText: attributeName === 'engine-power' ? 'HP' : attributeName === 'max-speed' ? 'Km/h' : '',
        })
        atributeContainer.append(atributeValueAfter)

        atributesContainer.append(atributeContainer)
      }
    }
  }
}


export const createCarsList = (
  carsArr: Product [] ,
  carsCardContainer: HTMLElement
): HTMLElement => {
  const childElementsCarCard = [];
  for (const carData of carsArr) {
    const oneCarCardContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCard],
    })
    carsCardContainer.append(oneCarCardContainer);


    const productImages: Image[] | undefined = carData.masterData.current.masterVariant.images
    if (productImages !== undefined) {
      const carTbImg = createHtmlElement({
        tagName: 'img',
        cssClass: [CSS_CLASSES.carCardTb],
        srcAtribute: productImages[0].url,
        altAtribute: carData.masterData.current.name['en-US'],
      })
      childElementsCarCard.push(carTbImg)
    }
    const carPriceBlock = installOfTheCurrentPrice(carData)
    childElementsCarCard.push(carPriceBlock)


    const carTitle = createHtmlElement({
      tagName: 'h2',
      cssClass: [CSS_CLASSES.carCardTitle],
      elementText: carData.masterData.current.name['en-US'],
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
        pageList.CUR_CAR = carData.key as string;
        window.location.href = `#${pageList.CUR_CAR}`
      })
    }
    childElementsCarCard.push(moreInfoLink)
    oneCarCardContainer.append(...childElementsCarCard)
    carCharacterBlock(carData, сarСharacteristicsCont)

  }
  return carsCardContainer
}


