import { PROJECT_KEY } from "../../constants/api-constants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssclases"
import { createHtmlElement } from "../../utils/createelement"
import { Product, Image, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import { createSlider } from "./createSlider"
import { carCharacterBlock } from "../cars/getproducts"


export const getCar = (carKey: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .withKey({ key: carKey })
    .get()
    .execute()
}

export const createCarPage = (
  carData: ProductProjection,
  carContainer: HTMLElement
): HTMLElement => {

  const productImages: Image[] | undefined = carData.masterVariant.images;
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

  if (productImages !== undefined && productImages.length > 1) {
    carSliderWrapper.append(carSlider);
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
  } else if (productImages !== undefined && productImages.length === 1) {
    const carImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.carCardTb],
      srcAtribute: productImages[0].url,
      altAtribute: carData.name['en-US'],
    })
    carSliderWrapper.append(carImg);
  }
  const carTitleContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carPageTitle],
  })

  carDetailsWrapper.append(carTitleContainer)

  const carTitle = createHtmlElement({
    tagName: 'h1',
    cssClass: [CSS_CLASSES.carPageTitle],
    elementText: carData.name['en-US'],
  })
  carTitleContainer.append(carTitle)
  const carCharactersContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carPageTitle],
  })
  carTitleContainer.append(carCharactersContainer)
  const charcters = carCharacterBlock(carData, carTitleContainer)
  // const productImages: Image[] | undefined =
  //   carData.masterData.current.masterVariant.images
  // if (productImages !== undefined && productImages.length < 2 ) {

  //   console.log(carImg)
  // }

  return carContainer
}
