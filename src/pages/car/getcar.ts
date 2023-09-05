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
  const carTitle = createHtmlElement({
    tagName: 'h1',
    cssClass: [CSS_CLASSES.carPageTitle],
    elementText: carData.masterData.current.name['en-US']
  })
  carContainer.append(carTitle);
  const carSliderWrapper = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carSliderWrapper],
  })
  carContainer.append(carSliderWrapper);
  const carSlider = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carSlider],
  })
  carSliderWrapper.append(carSlider);
  const productImages: Image[] | undefined = carData.masterData.current.masterVariant.images;
  // if (productImages !== undefined) {
  //   for (let productImage of productImages) {
  //     const carImg = createHtmlElement({
  //       tagName: 'img',
  //       cssClass: [CSS_CLASSES.carCardTb],
  //       srcAtribute: productImage.url,
  //       altAtribute: carData.masterData.current.name['en-US'],
  //     })
  //     carImg.classList.add("car__slider__img");
  //     carSlider.append(carImg);
  //   }
  // }
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

  return carContainer
}
