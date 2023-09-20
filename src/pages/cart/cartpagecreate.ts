import { CSS_CLASSES } from "../../constants/cssclases";
import { createHtmlElement } from "../../utils/createelement";
import { getCartById } from "./cartactions";
import { resolveMessageAddAndRemove } from "../../utils/resolvemsg";
import { cartIsEmpty } from "./cartisemptymsg";
import { createCartItems } from "./createcartitems";


export function createCartPage(container: HTMLElement) {
  const doesTheShoppingCartExist: string | undefined | null = localStorage.getItem('curent_cart_id');
  container.innerHTML = '';
  if (doesTheShoppingCartExist) {
    const request = getCartById(doesTheShoppingCartExist);
    request
      .then((data) => {
        const cartItems = data.body.lineItems;
        const cartVersion = data.body.version.toString()
        localStorage.setItem('cart_version', cartVersion)
        createCartItems(cartItems, container)
        const totaPriceValue = data.body.totalPrice.centAmount / 100;
        const formatedPrice = totaPriceValue.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })
        const totalPrice = createHtmlElement({
          tagName: 'div',
          cssClass: [CSS_CLASSES.totalPrice],
          elementText: formatedPrice 
        })
        container.append(totalPrice)
        console.log(data);
        const totalLineItemQuantityIs: number | undefined = data.body.totalLineItemQuantity;
        if (totalLineItemQuantityIs === undefined) {
          cartIsEmpty(container);
          totalPrice.remove()
        }
      })
      .catch((error) => {
        if (error.statusCode === 404) {
          cartIsEmpty(container)
          localStorage.removeItem('curent_cart_id')
          localStorage.removeItem('cart_version')
          const resolveMessage: string = 'We did not manage to save your basket, fill it again'
          resolveMessageAddAndRemove(resolveMessage, false)
        } else {
          console.error('Произошла другая ошибка:', error.message);
        }
      });
  } else {
    cartIsEmpty(container)
    localStorage.removeItem('curent_cart_id')
    localStorage.removeItem('cart_version')
  }
  return container
}

