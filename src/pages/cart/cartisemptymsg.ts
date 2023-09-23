import { CSS_CLASSES } from "../../constants/cssclases";
import { createHtmlElement } from "../../utils/createelement";

export function cartIsEmpty(cartcontainer: HTMLElement) {
  const cardAlertContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.cardAlertContainer],
  })
  cartcontainer.append(cardAlertContainer);
  const cardAlertImg = createHtmlElement({
    tagName: 'img',
    cssClass: [CSS_CLASSES.cartAlertImg],
    srcAtribute: './images/ferrari-daytona.png'
  })
  cardAlertContainer.append(cardAlertImg);
  const cardAlert = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.cartalert],
    elementHtml: `Your cart is empty :( <br/>
      Please choose car <br/>
       from the <a href="#cars">catalog</a>.`
  })
  cardAlertContainer.append(cardAlert);
}