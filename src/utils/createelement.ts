import { ElementOptions } from '../types/types'
export const createHtmlElement = ({
  tagName,
  cssClass,
  elementText,
  elementId,
  typeElement,
  nameElement,
  valueElement,
}: ElementOptions):
  | HTMLElement
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLDivElement => {
  const element = document.createElement(tagName)
  cssClass.forEach((className) => {
    element.classList.add(className)
  })
  if (elementText) {
    element.innerText = elementText
  }
  if (elementId) {
    element.setAttribute('id', elementId)
  }
  if (typeElement) {
    element.setAttribute('type', typeElement)
  }
  if (nameElement) {
    element.setAttribute('name', nameElement)
  }
  if (valueElement && element instanceof HTMLInputElement) {
    element.value = valueElement
  }
  return element
}
