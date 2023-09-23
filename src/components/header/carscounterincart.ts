import { CSS_CLASSES } from "../../constants/cssclases";
import { getCartById } from "../../pages/cart/cartactions";
import { createHtmlElement } from "../../utils/createelement";

export const carInCartCounter = async () => {
  const cartId = localStorage.getItem('curent_cart_id');
  const carsInCartCounterOld = document.querySelector(`.${CSS_CLASSES.carsInCartCounter}`)
  carsInCartCounterOld?.remove();
  if (cartId) {
    await getCartById(cartId)
      .then(response => {
        const counterParentElement = document.getElementById('btn-cart')
        const carsIncart: string = response.body.lineItems.length.toString();
        const carsInCartCounter = createHtmlElement({
          tagName: 'span',
          cssClass: [CSS_CLASSES.carsInCartCounter],
          elementText: carsIncart
        })
        if (counterParentElement) {
          counterParentElement.append(carsInCartCounter)
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log(error)
      });
  }
}


