import { LineItem } from "@commercetools/platform-sdk";
import { CSS_CLASSES } from "../../constants/cssClases";
import { chageQuantityItemInCart } from "../../utils/carChangeuQantiti";
import { createEl } from "../../utils/createElement";
import { updateCartAddAuto, updateCartRemoveAuto } from "./cartActions";
import { resolveMessageAddAndRemove } from "../../utils/resolveMsg";
import { createCartPage } from "./cartPageCreate";
import { carInCartCounter } from "../../components/header/carsCounterInCart";


export const createCartItems = (arrCartItems: LineItem[], container: HTMLElement) => {
  let i = 0;
  while (i < arrCartItems.length) {
    const cartItem = createEl('div', [CSS_CLASSES.cartItem])
    container.append(cartItem);

    const cartItemNumber = createEl('div', [CSS_CLASSES.cartItemNumber], `#${i + 1}`)
    cartItem.append(cartItemNumber);
    const thumbImg = arrCartItems[i].variant.images;
    const thumbUrlImg: string | undefined = thumbImg ? thumbImg[0].url : undefined;

    if (thumbUrlImg) {
      const cartItemImage = createEl('img', [CSS_CLASSES.cartItemImage], undefined, [thumbUrlImg]);
      cartItem.append(cartItemImage);
    }

    const cartItemName = createEl('div', [CSS_CLASSES.cartItemName], arrCartItems[i].name["en-US"])
    cartItem.append(cartItemName);

    const cartItemQuantity = createEl('div', [CSS_CLASSES.cartItemQuantity])
    cartItem.append(cartItemQuantity);

    const smallerBtn = createEl('button', [CSS_CLASSES.quantityBtn], '-')
    cartItemQuantity.append(smallerBtn)

    const quantityInput: HTMLInputElement = createEl('input', [CSS_CLASSES.quantityInput], 
      `${arrCartItems[i].quantity}`);
    cartItemQuantity.append(quantityInput);
    quantityInput.setAttribute('readOnly', 'true');
    const quantityStart: number = parseInt(quantityInput.value, 10);

    const moreBtn = createEl('button',[CSS_CLASSES.quantityBtn],'+')
    cartItemQuantity.append(moreBtn)

    const priceItem = arrCartItems[i].totalPrice.centAmount / 100;
    const formatedPrice = priceItem.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const cartItemPrice = createEl('div', [CSS_CLASSES.cartItemPrice], formatedPrice)
    cartItem.append(cartItemPrice);

    const cartItemBtnsContainer = createEl('div', [CSS_CLASSES.cartItemBtnsContainer])
    cartItem.append(cartItemBtnsContainer)

    const cartItemRecalculateBtn = createEl('button', [CSS_CLASSES.cartItemRecalculateBtn], 'Recalculate')
    cartItemBtnsContainer.append(cartItemRecalculateBtn);
    cartItemRecalculateBtn.setAttribute('disabled', 'disabled');

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
    const cartItemDeleteBtn = createEl('button', [CSS_CLASSES.cartItemDeleteBtn], 'Delete')

    const carQuantity = arrCartItems[i].quantity;
    cartItemBtnsContainer.append(cartItemDeleteBtn);
    if (curentCartId && cartVersionString) {
      const cartVersionNumber: number = parseInt(cartVersionString)
      cartItemDeleteBtn.addEventListener('click', async () => {
        try {
          await updateCartRemoveAuto(curentCartId, cartVersionNumber, carLineId, carQuantity);
          const resolveMessage: string = `The car of the ${carName} is removed`
          resolveMessageAddAndRemove(resolveMessage, true)
          setTimeout(()=>{carInCartCounter()}, 1000)
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

