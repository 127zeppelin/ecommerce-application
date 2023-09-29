import { HTMLElementTagNameMap } from '../types/types'

export function createEl<K extends keyof HTMLElementTagNameMap>(
  elementName: K,
  className?: string[],
  content?: string,
  hrefOrSrcAtribute?: string[],
  callback?: (event: Event) => void
): HTMLElementTagNameMap[K] {
  const element = document.createElement(elementName);
  if (className && className.length > 0) {
    element.classList.add(...className);
  }
  if (content) {
    if (elementName !== 'input' ) {
      element.innerHTML = content; 
    } else if (elementName === 'input' ) {
      element.setAttribute('value', content);
    }
  }
  if (elementName === 'img' && hrefOrSrcAtribute) {
    element.setAttribute('src', hrefOrSrcAtribute[0])
    if (hrefOrSrcAtribute.length === 2) {
      element.setAttribute('alt', hrefOrSrcAtribute[1])
    } else {
      element.setAttribute('alt', '')
    }
  } else if (elementName === 'a' && hrefOrSrcAtribute) { 
    element.setAttribute('href', hrefOrSrcAtribute[0]) 
  }
  if (callback) {
    element.addEventListener('click', callback);
  }
  return element;
}


