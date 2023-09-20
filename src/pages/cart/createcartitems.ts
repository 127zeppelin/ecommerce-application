import { LineItem } from "@commercetools/platform-sdk";
import { CSS_CLASSES } from "../../constants/cssclases";
import { chageQuantityItemInCart } from "../../utils/carchangequantiti";
import { createHtmlElement } from "../../utils/createelement";
import { updateCartAddAuto, updateCartRemoveAuto } from "./cartactions";
import { resolveMessageAddAndRemove } from "../../utils/resolvemsg";
import { createCartPage } from "./cartpagecreate";


export const createCartItems = (arrCartItems: LineItem[], container: HTMLElement) => {
  let i = 0;
  while (i < arrCartItems.length) {
    const cartItem = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItem],
    })
    container.append(cartItem);

    const cartItemNumber = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItemNumber],
      elementText: `#${i + 1}`
    })
    cartItem.append(cartItemNumber);
    const thumbImg = arrCartItems[i].variant.images;
    const thumbUrlImg: string | undefined = thumbImg ? thumbImg[0].url : undefined;

    if (thumbUrlImg) {
      const cartItemImage = createHtmlElement({
        tagName: 'img',
        cssClass: [CSS_CLASSES.cartItemImage],
        srcAtribute: thumbUrlImg
      })
      cartItem.append(cartItemImage);
    }

    const cartItemName = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItemName],
      elementText: arrCartItems[i].name["en-US"]

    })
    cartItem.append(cartItemName);

    const cartItemQuantity = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItemQuantity],
    })
    cartItem.append(cartItemQuantity);

    const smallerBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.quantityBtn],
      elementText: '-'
    })
    cartItemQuantity.append(smallerBtn)

    const quantityInput: HTMLInputElement = createHtmlElement({
      tagName: 'input',
      cssClass: [CSS_CLASSES.quantityInput],
      valueElement: `${arrCartItems[i].quantity}`
    }) as HTMLInputElement
    cartItemQuantity.append(quantityInput);
    quantityInput.setAttribute('readOnly', 'true');
    const quantityStart: number = parseInt(quantityInput.value, 10);

    const moreBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.quantityBtn],
      elementText: '+'
    })
    cartItemQuantity.append(moreBtn)

    const priceItem = arrCartItems[i].totalPrice.centAmount / 100;
    const formatedPrice = priceItem.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const cartItemPrice = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItemPrice],
      elementText: formatedPrice
    })
    cartItem.append(cartItemPrice);

    const cartItemBtnsContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartItemBtnsContainer],
    })
    cartItem.append(cartItemBtnsContainer)

    const cartItemRecalculateBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.cartItemRecalculateBtn],
      elementText: 'Recalculate'
    })
    cartItemBtnsContainer.append(cartItemRecalculateBtn);

    chageQuantityItemInCart(smallerBtn, quantityInput, moreBtn, cartItemRecalculateBtn, quantityStart);

    const carId = arrCartItems[i].productId;
    const carLineId = arrCartItems[i].id;
    const carName = arrCartItems[i].name['en-US'];
    const curentCartId: string | undefined | null = localStorage.getItem('curent_cart_id');
    const cartVersionString: string | undefined | null = localStorage.getItem('cart_version');
    cartItemRecalculateBtn.addEventListener('click', async () => {
      const changedQuantity: number = parseInt(quantityInput.value, 10);
      if (curentCartId && cartVersionString) {
        if (changedQuantity > quantityStart) {
          const addQuantity: number = changedQuantity - quantityStart;
          const cartVersionNumber: number = parseInt(cartVersionString)
          try {
            await updateCartAddAuto(curentCartId, cartVersionNumber, carId, addQuantity);
            const resolveMessage: string = `The cost of rent for the car ${carName} is recalculated`
            resolveMessageAddAndRemove(resolveMessage, true)
          } catch (error) {
            const resolveMessage: string = `Houston we have a problem ${error}`
            resolveMessageAddAndRemove(resolveMessage, false)
          }
          const cartContainer: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.cartContainer}`);
          if (cartContainer !== null) {
            createCartPage(cartContainer)
          }
        } else {
          const removeQuantity: number = quantityStart - changedQuantity;
          const cartVersionNumber: number = parseInt(cartVersionString)
          try {
            await updateCartRemoveAuto(curentCartId, cartVersionNumber, carLineId, removeQuantity);
            const resolveMessage: string = `The cost of rent for the car ${carName} is recalculated`
            resolveMessageAddAndRemove(resolveMessage, true)
          } catch (error) {
            const resolveMessage: string = `Houston we have a problem ${error}`
            resolveMessageAddAndRemove(resolveMessage, false)
          }
          const cartContainer: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.cartContainer}`);
          if (cartContainer !== null) {
            createCartPage(cartContainer)
          }
        }
      }
    })
    const cartItemDeleteBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.cartItemDeleteBtn],
      elementText: 'Delete'
    })

    const carQuantity = arrCartItems[i].quantity;
    cartItemBtnsContainer.append(cartItemDeleteBtn);
    if (curentCartId && cartVersionString) {
      const cartVersionNumber: number = parseInt(cartVersionString)
      cartItemDeleteBtn.addEventListener('click', async () => {
        try {
          await updateCartRemoveAuto(curentCartId, cartVersionNumber, carLineId, carQuantity);
          const resolveMessage: string = `The car of the ${carName} is removed`
          resolveMessageAddAndRemove(resolveMessage, true)
        } catch (error) {
          const resolveMessage: string = `Houston we have a problem ${error}`
          resolveMessageAddAndRemove(resolveMessage, false)
        }
        const cartContainer: HTMLElement | null = document.querySelector(`.${CSS_CLASSES.cartContainer}`);
        if (cartContainer !== null) {
          createCartPage(cartContainer)
        }
      })
    }
    i += 1
  }
}

