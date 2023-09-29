import { PROJECT_KEY } from "../../constants/apiConstants"
import { apiRoot } from "../../components/api"
import { CSS_CLASSES } from "../../constants/cssClases"
import { createEl, createHtmlElement } from "../../utils/createElement"
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

  const carDetailsWrapper = createEl('div', [CSS_CLASSES.carDetailsWrapper])
  carContainer.append(carDetailsWrapper);

  if (productImages && productImages.length > 1) {
    const carSliderWrapper = createEl('div',[CSS_CLASSES.carSliderWrapper])
    carDetailsWrapper.append(carSliderWrapper);

    const carSlider = createEl('div',[CSS_CLASSES.carSlider])
    carSliderWrapper.append(carSlider);

    const sliderBtnPrev = createEl('button', [CSS_CLASSES.prevBtn], "<")
    carSlider.append(sliderBtnPrev);

    const sliderBtnNext = createEl('button',[CSS_CLASSES.nextBtn],">")
    carSlider.append(sliderBtnNext);

    createSlider(carData, productImages);
  } else if (productImages && productImages.length  === 1) {
    const carImageWraper = createEl('div',[CSS_CLASSES.carImgWrapper])
    carDetailsWrapper.append(carImageWraper);

    const carImg = createEl('img',[CSS_CLASSES.carCardTb], undefined, [productImages[0].url, carData.name['en-US']])
    carImageWraper.append(carImg);
  }
  const carDetailsContainer = createEl('div',[CSS_CLASSES.carDetails])
  carDetailsWrapper.append(carDetailsContainer)

  const carTitle = createEl('h2', [CSS_CLASSES.carPageTitle], carData.name['en-US'])
  carDetailsContainer.append(carTitle)

  const carCharactersContainer = createEl('div', [CSS_CLASSES.carCharactersContainer])
  carDetailsContainer.append(carCharactersContainer)
  carCharacterBlock(carData, carCharactersContainer)

  const carPriceContainer = createEl('div', [CSS_CLASSES.carPriceContainer])
  carDetailsContainer.append(carPriceContainer)

  const priceCar = installOfTheCurrentPrice(carData)
  carPriceContainer.append(priceCar)

  const rentCarBtnContainer = createEl('div', [CSS_CLASSES.rentCarBtnContainer])
  carDetailsContainer.append(rentCarBtnContainer)

  const smallerBtn = createEl('button', [CSS_CLASSES.quantityBtn], '-')
  rentCarBtnContainer.append(smallerBtn)

  const quantityInput: HTMLInputElement = createEl('input', [CSS_CLASSES.quantityInput], '1')
  rentCarBtnContainer.append(quantityInput)

  const moreBtn = createEl('button', [CSS_CLASSES.quantityBtn], '+')
  rentCarBtnContainer.append(moreBtn)

  chageQuantity(smallerBtn, quantityInput, moreBtn)

   const addInCartHendler = async () => {
    await addInCart(carId, parseInt(quantityInput.value, 10), carData.name['en-US'])
  }
  const rentCarBtn = createEl('button', [CSS_CLASSES.rentCarBtn], 'Rent a Car', undefined, addInCartHendler)
  rentCarBtnContainer.append(rentCarBtn)

  if (carData.description) {
    const carDiscription = createEl('p', [CSS_CLASSES.carArticle], carData.description['en-US'])
    carContainer.append(carDiscription)
  }

  return carContainer
}
