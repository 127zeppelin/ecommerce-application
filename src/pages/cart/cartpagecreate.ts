import { CSS_CLASSES } from "../../constants/cssClases";
import { createEl } from "../../utils/createElement";
import { CartDeletionAndPageRefresh, addDiscountCode, getCartById } from "./cartActions";
import { resolveMessageAddAndRemove } from "../../utils/resolveMsg";
import { pageIsEmpty } from "../../utils/cartIsemptyMsg";
import { createCartItems } from "./createCartItems";
import { carInCartCounter } from "../../components/header/carsCounterInCart";


export function createCartPage(container: HTMLElement) {
  const doesTheShoppingCartExist: string | undefined | null = localStorage.getItem('curent_cart_id');
  const pageIsEmptyMsq: string = `Your cart is empty :( <br/>Please choose car 
                                     <br/>from the <a href="#cars">catalog</a>.`
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
        const totalPrice = createEl('div', [CSS_CLASSES.totalPrice], formatedPrice)
        container.append(totalPrice)

        const discountCodeContainer = createEl('div', [CSS_CLASSES.discountCodeContainer]);
        container.append(discountCodeContainer);
        const inputDiscountCode: HTMLInputElement = createEl('input', [CSS_CLASSES.inputDiscountCode]);
        inputDiscountCode.setAttribute('type', 'text');
        discountCodeContainer.append(inputDiscountCode)

        const discountCodeSubmit = async () => {
          const discountCodeValue: string = inputDiscountCode.value
          const shoppingCartVersionNumber = parseInt(cartVersion)
          try {
            await addDiscountCode(doesTheShoppingCartExist, shoppingCartVersionNumber, discountCodeValue);
            container.innerHTML = '';
            createCartPage(container);
            const resolveMessage: string = `The discount is applied to the basket`
            resolveMessageAddAndRemove(resolveMessage, true)
          } catch (error) {
            const resolveMessage: string = `${error}`
            resolveMessageAddAndRemove(resolveMessage, false)
          }
        }
        const submitDiscount = createEl('button', [CSS_CLASSES.submitDiscountCode], 'Add the code', undefined, discountCodeSubmit)
        discountCodeContainer.append(submitDiscount)

        const totalLineItemQuantityIs: number | undefined = data.body.totalLineItemQuantity;
        if (totalLineItemQuantityIs === undefined) {
          pageIsEmpty(container, pageIsEmptyMsq);
          totalPrice.remove();
          discountCodeContainer.remove();
        }
        const clearCartBtnContainer = createEl('div', [CSS_CLASSES.clearCartBtnContainer])
        container.append(clearCartBtnContainer)

        const cleatCartBtn = createEl('button', [CSS_CLASSES.submitDiscountCode], 'Clear cart')
        clearCartBtnContainer.append(cleatCartBtn)
        cleatCartBtn.addEventListener('click',
          async () => {
            const cartId = data.body.id
            const getCartVersion = data.body.version
            CartDeletionAndPageRefresh(cartId, getCartVersion, container)
            setTimeout(() => { carInCartCounter() }, 1000)
          })
      })
      .catch((error) => {
        if (error.statusCode === 404) {
          pageIsEmpty(container, pageIsEmptyMsq)
          localStorage.removeItem('curent_cart_id')
          localStorage.removeItem('cart_version')
          const resolveMessage: string = 'We did not manage to save your basket, fill it again'
          resolveMessageAddAndRemove(resolveMessage, false)
        } else {
          const resolveMessage: string = error.message
          resolveMessageAddAndRemove(resolveMessage, false)
        }
      });
  } else {
    pageIsEmpty(container, pageIsEmptyMsq)
    localStorage.removeItem('curent_cart_id')
    localStorage.removeItem('cart_version')
  }
  return container
}

