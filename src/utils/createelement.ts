import { ElementOptions, HTMLElementTagNameMap } from '../types/types'
export const createHtmlElement = ({
  tagName,
  cssClass,
  elementText,
  elementHtml,
  elementId,
  typeElement,
  nameElement,
  valueElement,
  srcAtribute,
  altAtribute,
  dataCarAtribute,
  forElement,
  appendInElement
}: ElementOptions):
| HTMLElement
| HTMLButtonElement
| HTMLInputElement
| HTMLDivElement
| HTMLButtonElement
| HTMLSelectElement
| HTMLOptionElement => {
  const element = document.createElement(tagName)
  cssClass.forEach((className) => {
    element.classList.add(className)
  })
  if (elementText) {
    element.innerText = elementText
  }
  if (elementHtml) {
    element.innerHTML = elementHtml
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
  if (valueElement) {
    if (element instanceof HTMLInputElement) {
      element.setAttribute('value', valueElement)
    } else if (element instanceof HTMLSelectElement) {
      element.setAttribute('value', valueElement)
    } else if (element instanceof HTMLButtonElement) {
      element.setAttribute('value', valueElement)
    } else if (element instanceof HTMLOptionElement) {
      element.setAttribute('value', valueElement)
    }
  }
  if (srcAtribute) {
    element.setAttribute('src', srcAtribute)
  }
  if (altAtribute) {
    element.setAttribute('alt', altAtribute)
  }
  if (dataCarAtribute) {
    element.setAttribute('data-car', dataCarAtribute)
  }
  if (forElement) {
    element.setAttribute('for', forElement)
  }
  if (appendInElement){
    appendInElement.append(element)
  }
  return element
}


export function createEl<K extends keyof HTMLElementTagNameMap>(
  elementName: K,
  className?: string[],
  content?: string,
  hrefAtribute?: string,
  callback?: (event: Event) => void
): HTMLElementTagNameMap[K] {
  const element = document.createElement(elementName);
  if (className && className.length > 0) {
    element.classList.add(...className); 
  }
  if (content) {
      element.textContent = content;
  }
  if (hrefAtribute) {
    element.setAttribute('href', hrefAtribute)
  }
  if (callback) {
      element.addEventListener('click', callback);
  }
  return element;
}


