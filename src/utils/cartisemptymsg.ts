import { CSS_CLASSES } from "../constants/cssClases";
import { createEl } from "./createElement";

export function pageIsEmpty(cartcontainer: HTMLElement, msg: string) {
  const cardAlertContainer = createEl('div', [CSS_CLASSES.cardAlertContainer])
  cartcontainer.append(cardAlertContainer);
  const cardAlertImg = createEl('img', [CSS_CLASSES.cartAlertImg], undefined, ['./images/ferrari-daytona.png'])
  cardAlertContainer.append(cardAlertImg);
  const cardAlert = createEl('div', [CSS_CLASSES.cartalert], msg)
  cardAlertContainer.append(cardAlert);
}