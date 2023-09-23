import { CSS_CLASSES } from "../constants/cssclases";
import { createHtmlElement } from "./createelement";

export function pageIsEmpty(cartcontainer: HTMLElement, msg: string) {
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
    elementHtml: msg
  })
  cardAlertContainer.append(cardAlert);
}