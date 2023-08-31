import { PROJECT_KEY } from "../../constants/api-constants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssclases"
import { createHtmlElement } from "../../utils/createelement"
import { Car } from "../../types/types"

export const getCar = (carKey: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .products()
    .withKey({ key: carKey })
    //.withId({ID: carSlug})
    .get()
    .execute()
}


export const createCarPage = (
  carData: Car,
  carContainer: HTMLElement
): HTMLElement => {
  const carTitle = createHtmlElement({
    tagName: 'h1',
    cssClass: [CSS_CLASSES.carCard],
    elementText: carData.masterData.current.name['en-US']
  })
  carContainer.append(carTitle);
  const carImg = createHtmlElement({
    tagName: 'img',
    cssClass: [CSS_CLASSES.carCardTb],
    srcAtribute: carData.masterData.current.masterVariant.images[0].url,
    altAtribute: carData.masterData.current.name['en-US'],
  })
  carContainer.append(carImg);
  return carContainer
}
