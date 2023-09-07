import { PROJECT_KEY } from "../../constants/api-constants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssclases"
import { createHtmlElement } from "../../utils/createelement"
import { Product, Image } from '@commercetools/platform-sdk/dist/declarations/src'
import { createSlider } from "./createSlider"


export const getCar = (carKey: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .products()
    .withKey({ key: carKey })
    .get()
    .execute()
}

export const createCarPage = (
  carData: Product,
  carContainer: HTMLElement
): HTMLElement => {

  const carDetailsWrapper = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carDetailsWrapper],
  })
  carContainer.append(carDetailsWrapper);

  const carSliderWrapper = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carSliderWrapper],
  })
  carDetailsWrapper.append(carSliderWrapper);
  const carSlider = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carSlider],
  })
  carSliderWrapper.append(carSlider);
  const productImages: Image[] | undefined = carData.masterData.current.masterVariant.images;

  let sliderBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.prevBtn],
  })
  sliderBtn.innerText = "<";
  carSlider.append(sliderBtn);
  sliderBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.nextBtn],
  })
  sliderBtn.innerText = ">";
  carSlider.append(sliderBtn);

  createSlider(carData, productImages);

  const carTitle = createHtmlElement({
    tagName: 'h1',
    cssClass: [CSS_CLASSES.carPageTitle],
    elementText: carData.masterData.current.name['en-US'],
  })
  carContainer.append(carTitle)
  const productImages: Image[] | undefined =
    carData.masterData.current.masterVariant.images
  if (productImages !== undefined) {
    const carImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.carCardTb],
      srcAtribute: productImages[0].url,
      altAtribute: carData.masterData.current.name['en-US'],
    })
    carContainer.append(carImg)
  }

  return carContainer
}
