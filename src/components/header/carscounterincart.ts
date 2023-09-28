import { CSS_CLASSES } from "../../constants/cssClases";
import { getCartById } from "../../pages/cart/cartActions";
import { createEl } from "../../utils/createElement";

export const carInCartCounter = async () => {
  const cartId = localStorage.getItem('curent_cart_id');
  const carsInCartCounterOld = document.querySelector(`.${CSS_CLASSES.carsInCartCounter}`)
  carsInCartCounterOld?.remove();
  if (cartId) {
    await getCartById(cartId)
      .then(response => {
        const counterParentElement = document.getElementById('btn-cart')
        const carsIncart: string = response.body.lineItems.length.toString();
        const carsInCartCounter = createEl('span', [CSS_CLASSES.carsInCartCounter], carsIncart)
        if (counterParentElement) {
          counterParentElement.append(carsInCartCounter)
        }
      })
      .catch(error => {
        console.error(error)
      });
  }
}


