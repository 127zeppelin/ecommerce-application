import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import { Car } from '../../types/types'
import { createHtmlElement } from '../../utils/createelement'
import { CSS_CLASSES } from '../../constants/cssclases'


export const getCars = () => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .products()
    .get()
    .execute()
}

const carCharacterBlock = (carData: Car, atributesContainer: HTMLElement) => {
  const arrayAtributs = carData.masterData.current.masterVariant.attributes
  for (const attribute of arrayAtributs) {
    // Ваш од для обрабкотки каждого атрибута здесь
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

      atributesContainer.append(atributeContainer)
    }
  }
}


export const createCarsList = (
  carsArr: Car[],
  carsCardContainer: HTMLElement
): HTMLElement => {
  for (const carData of carsArr) {
    const carCardContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCard],
    })
    carsCardContainer.append(carCardContainer)

    const carTbImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.carCardTb],
      srcAtribute: carData.masterData.current.masterVariant.images[0].url,
      altAtribute: carData.masterData.current.name['en-US'],
    })
    carCardContainer.append(carTbImg)

    const carTitle = createHtmlElement({
      tagName: 'h2',
      cssClass: [CSS_CLASSES.carCardTitle],
      elementText: carData.masterData.current.name['en-US'],
    })
    carCardContainer.append(carTitle)

    const сarСharacteristicsCont = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCharacterCont],
    })
    carCardContainer.append(сarСharacteristicsCont)
    carCharacterBlock(carData, сarСharacteristicsCont)
  }
  return carsCardContainer
}


