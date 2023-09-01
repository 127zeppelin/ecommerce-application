import { CSS_CLASSES } from "../constants/cssclases";
import { Car } from "../types/types";
import { createHtmlElement } from "./createelement";



export const installOfTheCurrentPrice = (carData: Car) => {

  const carPriceBlock = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carCardPriceBlock],
  })

  const carPrice: number | undefined | null =
    carData.masterData.current.masterVariant.prices[0]?.value?.centAmount / 100;
  if (carPrice) {
    const formattedPrice = carPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    const carPriceDefaultBlock = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCardPrice],
      elementHtml: `<span>${formattedPrice} </span>
      <span class="${CSS_CLASSES.carCardPriceLabel}">per day</span>`,
    })
    carPriceBlock.append(carPriceDefaultBlock)

    const carPriceDiscountCents: number | undefined =
      carData.masterData.current.masterVariant.prices[0].discounted?.value?.centAmount;
    if (carPriceDiscountCents !== undefined) {
      const carPriceDiscount = carPriceDiscountCents / 100;
      const formattedPriceDiscount = carPriceDiscount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      const carPriceDiscountBlock = createHtmlElement({
        tagName: 'div',
        cssClass: [CSS_CLASSES.carCardPrice],
        elementHtml: `<span>${formattedPriceDiscount} </span>
        <span class="${CSS_CLASSES.carCardPriceLabel}">per day</span>`,
      })
      carPriceDefaultBlock.classList.add(CSS_CLASSES.notAnActivePrice);
      carPriceBlock.append(carPriceDiscountBlock)
    }
  }
  return carPriceBlock
}