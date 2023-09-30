import { CSS_CLASSES } from "../../constants/cssClases";
import { Image, ProductProjection } from '@commercetools/platform-sdk/dist/declarations/src'
import { createEl } from "../../utils/createElement";

const addImg = (carData: ProductProjection, productImages: Image[] | undefined, carSlider: HTMLElement, i: number) => {
  let carImg;
  if (productImages) {
    carImg = createEl('img', [CSS_CLASSES.carCardTb], undefined, [productImages[i].url, carData.name['en-US']])
    carImg.classList.add("car__slider__img");
    carSlider.append(carImg);
  }
  return carImg;
}

export const createSlider = (carData: ProductProjection, productImages: Image[] | undefined) => {
  const carSlider: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.carSlider}`);
  const prevBtn: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.prevBtn}`);
  const nextBtn: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.nextBtn}`);
  if (carSlider && prevBtn && nextBtn) {
    let slideCount: number;
    let slideIndex = 1;
    let carImg = addImg(carData, productImages, carSlider, slideIndex);

    if (productImages) {
      slideCount = productImages.length;
    }

    nextBtn.addEventListener('click', () => {
      slideIndex = slideIndex + 1 < slideCount ? slideIndex + 1 : 1;
      carImg?.remove();
      carImg = addImg(carData, productImages, carSlider, slideIndex);
    });

    prevBtn.addEventListener('click', () => {
      slideIndex = slideIndex - 1 < 1 ? slideCount - 1 : slideIndex - 1;
      carImg?.remove();
      carImg = addImg(carData, productImages, carSlider, slideIndex);
    });
  }
}
