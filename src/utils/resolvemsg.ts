import { CSS_CLASSES } from "../constants/cssClases";
import { createEl } from "./createElement";

export const resolveMessageAddAndRemove = (message: string, successfully: boolean): void => {
  const documentBody: HTMLElement | null = document.querySelector('body')
  const resolveMessage: HTMLElement = createEl('div')
  if (successfully) {
    resolveMessage.classList.add(CSS_CLASSES.resolveMsg, CSS_CLASSES.successfully)
  } else {
    resolveMessage.classList.add(CSS_CLASSES.resolveMsg)
  };
  resolveMessage.innerText = message;
  documentBody?.append(resolveMessage)
  setTimeout(() => {
    resolveMessage.remove()
  }, 4000)
}