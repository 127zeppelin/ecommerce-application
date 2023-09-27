import { PROJECT_KEY } from "../../constants/apiConstants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssClases"
import { createHtmlElement } from "../../utils/createElement"
import { Image, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import { createSlider } from "./createSlider"
import { carCharacterBlock } from "../cars/getProducts"
import { addInCart } from "./addInnCart"
import { installOfTheCurrentPrice } from "../../utils/price"
import { chageQuantity } from "../../utils/carChangeuQantiti"


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

  if (productImages && productImages.length > 1) {
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
  } else if (productImages && productImages.length  === 1) {
    const carImageWraper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carImgWrapper],
    })
    carDetailsWrapper.append(carImageWraper);
    const carImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.carCardTb],
      srcAtribute: productImages[0].url,
      altAtribute: carData.name['en-US'],
    })
    carImageWraper.append(carImg);
  }
  const carDetailsContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carDetails],
  })

  carDetailsWrapper.append(carDetailsContainer)

  const carTitle = createHtmlElement({
    tagName: 'h2',
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

  const carPriceContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carPriceContainer]
  })
  carDetailsContainer.append(carPriceContainer)

  const priceCar = installOfTheCurrentPrice(carData)
  carPriceContainer.append(priceCar)

  const rentCarBtnContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.rentCarBtnContainer]
  })
  carDetailsContainer.append(rentCarBtnContainer)

  const smallerBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.quantityBtn],
    elementText: '-'
  })
  rentCarBtnContainer.append(smallerBtn)

  const quantityInput: HTMLInputElement = createHtmlElement({
    tagName: 'input',
    cssClass: [CSS_CLASSES.quantityInput],
    valueElement: '1'
  }) as HTMLInputElement
  rentCarBtnContainer.append(quantityInput)

  const moreBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.quantityBtn],
    elementText: '+'
  })

  rentCarBtnContainer.append(moreBtn)

  chageQuantity(smallerBtn, quantityInput, moreBtn)

  const rentCarBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.rentCarBtn],
    elementText: 'Rent a Car'
  })
  rentCarBtn.addEventListener('click', async () => {
    await addInCart(carId, parseInt(quantityInput.value, 10), carData.name['en-US'])
  })

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
