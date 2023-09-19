import { LineItem } from "@commercetools/platform-sdk";
import { CSS_CLASSES } from "../../constants/cssclases";
import { createHtmlElement } from "../../utils/createelement";
import { getCartById } from "./cartactions";

const createCartItems = (arrCartItems: LineItem[], container: HTMLElement) => {
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
      elementText: `${arrCartItems[i].quantity}`
    })
    cartItem.append(cartItemQuantity);

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

    const cartItemDeleteBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.cartItemDeleteBtn],
      elementText: 'Delete'
    })
    cartItem.append(cartItemDeleteBtn);
    i += 1
  }
}


export const createCartPage = () => {
  const doesTheShoppingCartExist: string | undefined | null = localStorage.getItem('curent_cart_id');
  const cardContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.cartContainer]
  })
  if (doesTheShoppingCartExist) {
    const request = getCartById(doesTheShoppingCartExist);
    request
      .then((data) => {
        const cartItems = data.body.lineItems;
        createCartItems(cartItems, cardContainer)
      });
  } else {
    const cardAlertContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cardAlertContainer],
    })
    cardContainer.append(cardAlertContainer);
    const cardAlertImg = createHtmlElement({
      tagName: 'img',
      cssClass: [CSS_CLASSES.cartAlertImg],
      srcAtribute: './images/ferrari-daytona.png'
    })
    cardAlertContainer.append(cardAlertImg);
    const cardAlert = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartalert],
      elementText: 'Your cart is empty :('
    })
    cardAlertContainer.append(cardAlert);
  }
  return cardContainer
}
