import { CSS_CLASSES } from "../constants/cssclases";

export const resolveMessageAddAndRemove = (message : string, successfully: boolean): void => {
  const documentBody: HTMLElement | null = document.querySelector('body')
  const resolveMessage: HTMLElement = document.createElement('div')
  successfully ? resolveMessage.classList.add(CSS_CLASSES.resolveMsg, CSS_CLASSES.successfully): 
                 resolveMessage.classList.add(CSS_CLASSES.resolveMsg);
  resolveMessage.innerText = message;
  documentBody?.append(resolveMessage)
  setTimeout(() => {
    resolveMessage.remove()
  }, 4000)
}