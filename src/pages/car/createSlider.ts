import { CSS_CLASSES } from "../../constants/cssclases";
import { Product, Image } from '@commercetools/platform-sdk/dist/declarations/src'
import { createHtmlElement } from "../../utils/createelement";

const addImg = (carData: Product, productImages: Image[] | undefined, carSlider: HTMLElement, i: number) => {
  let carImg;
  if (productImages) {
      carImg = createHtmlElement({
        tagName: 'img',
        cssClass: [CSS_CLASSES.carCardTb],
        srcAtribute: productImages[i].url,
        altAtribute: carData.masterData.current.name['en-US'],
      })
      carImg.classList.add("car__slider__img");
      carSlider.append(carImg);
  }
  return carImg;
}

export const createSlider = (carData: Product, productImages: Image[] | undefined) => {
  const carSlider = document.querySelector(`.${CSS_CLASSES.carSlider}`) as HTMLElement;
  const prevBtn = document.querySelector(`.${CSS_CLASSES.prevBtn}`) as HTMLElement;
  const nextBtn = document.querySelector(`.${CSS_CLASSES.nextBtn}`) as HTMLElement;

  let slideCount: number;
  let slideIndex: number = 0;
  let carImg = addImg(carData, productImages, carSlider, slideIndex);

  if (productImages) {
    slideCount = productImages.length;
  }

  nextBtn.addEventListener('click', () => {
    slideIndex = slideIndex + 1 < slideCount ? slideIndex + 1 : 0;
    carImg?.remove();
    carImg = addImg(carData, productImages, carSlider, slideIndex);
  });

  prevBtn.addEventListener('click', () => {
    slideIndex = slideIndex - 1 < 0 ? slideCount - 1: slideIndex - 1;
    carImg?.remove();
    carImg = addImg(carData, productImages, carSlider, slideIndex);
  });
}
