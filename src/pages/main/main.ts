import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createElement'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

class MainPage extends Page {

  render() {
    const containerOuter = document.createElement('div')
    containerOuter.className = CSS_CLASSES.mainContainer
    this.container.append(containerOuter)
    const mainContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.mainPageContent]
    })
    containerOuter.append(mainContainer);
    const title = this.createHeaderTitle('Premium car rental')
    title.className = 'pade-title'
    mainContainer.append(title)

    const mainDiscription = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.mainPageDiscription],
      elementText: `In our club, we have an impressive collection of sports cars — from fairly 
                  common production models to true racing exclusives. Take advantage of this 
                  unique opportunity to get behind the wheel of a real legend and find out what 
                  it's capable of beyond the racetrack!`
    })
    mainContainer.append(mainDiscription);

    const discountCodeContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.discountCodeContainer],
    })
    mainContainer.append(discountCodeContainer);

    const discountCode = createHtmlElement({
      tagName: 'span',
      cssClass: [CSS_CLASSES.discountCode],
      elementText: 'FIRSTORDERDISCOUNT',
      valueElement: 'FIRSTORDERDISCOUNT'
    })
    discountCodeContainer.append(discountCode);

    const discountCodeCopy = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.submitDiscountCode],
      elementText: 'Copy code'
    })
    discountCodeContainer.append(discountCodeCopy);
    discountCodeCopy.addEventListener('click', () => {
      const textToCopy = discountCode.innerText;
      const tempInput = document.createElement('textarea');
      tempInput.value = textToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      const resolveMessage = 'Discount code is successfully copied to the exchange buffer'
      resolveMessageAddAndRemove(resolveMessage, true)
    })

    return this.container
  }
}

export default MainPage
