import { PROJECT_KEY } from "../../constants/api-constants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssclases"
import { createHtmlElement } from "../../utils/createelement"
import { Image, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import { createSlider } from "./createSlider"
import { carCharacterBlock } from "../cars/getproducts"
import { addInCart } from "./addincart"


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
  const carId: string = carData.id;
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
  const carDetailsContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carDetails],
  })

  carDetailsWrapper.append(carDetailsContainer)

  const carTitle = createHtmlElement({
    tagName: 'h1',
    cssClass: [CSS_CLASSES.carPageTitle],
    elementText: carData.name['en-US'],
  })
  carDetailsContainer.append(carTitle)
  const carCharactersContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carCharactersContainer],
  })
  carDetailsContainer.append(carCharactersContainer)
  carCharacterBlock(carData, carCharactersContainer)

  const rentCarBtnContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.rentCarBtn]
  })
  carDetailsContainer.append(rentCarBtnContainer)

  const rentCarBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.rentCarBtn],
    elementText: 'Rent a Car'
  })
  rentCarBtn.addEventListener('click', () => {addInCart(carId, 1)})
  rentCarBtnContainer.append(rentCarBtn)
  if (carData.description) {
    const carDiscription = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.carArticle],
      elementHtml: carData.description['en-US']
    })
    carContainer.append(carDiscription)
  }

  return carContainer
}
