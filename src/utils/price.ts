import { CSS_CLASSES } from '../constants/cssClases'
import { createHtmlElement } from './createElement'
import {
  Price,
  ProductProjection,
} from '@commercetools/platform-sdk/dist/declarations/src'

export const installOfTheCurrentPrice = (carData: ProductProjection) => {
  const carPriceBlock = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.carCardPriceBlock],
  })

  const carPriceArr: Price[] | undefined = carData.masterVariant.prices
  if (carPriceArr) {
    const carPrice: number | undefined = carPriceArr[0]?.value?.centAmount / 100
    const formattedPrice = carPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const carPriceDefaultBlock = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.carCardPrice],
      elementHtml: `<span>${formattedPrice} </span>
      <span class="${CSS_CLASSES.carCardPriceLabel}">per day</span>`,
    })
    carPriceBlock.append(carPriceDefaultBlock)

    const carPriceDiscountCents: number | undefined =
      carPriceArr[0]?.discounted?.value?.centAmount
    if (carPriceDiscountCents !== undefined) {
      const carPriceDiscount = carPriceDiscountCents / 100
      const formattedPriceDiscount = carPriceDiscount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      const carPriceDiscountBlock = createHtmlElement({
        tagName: 'div',
        cssClass: [CSS_CLASSES.carCardPrice],
        elementHtml: `<span>${formattedPriceDiscount} </span>
        <span class="${CSS_CLASSES.carCardPriceLabel}">per day</span>`,
      })
      carPriceDefaultBlock.classList.add(CSS_CLASSES.notAnActivePrice)
      carPriceBlock.append(carPriceDiscountBlock)
    }
  }
  return carPriceBlock
}
