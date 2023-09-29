import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createEl } from '../../utils/createElement'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

class MainPage extends Page {

  render() {
    const containerOuter = createEl('div', [CSS_CLASSES.mainContainer])
    this.container.append(containerOuter)

    const mainContainer = createEl('div', [CSS_CLASSES.mainPageContent])
    containerOuter.append(mainContainer);

    const title = createEl('h1', [CSS_CLASSES.pageTitle], 'Premium car rental')
    mainContainer.append(title)

    const elementText = `In our club, we have an impressive collection of sports cars — from fairly 
    common production models to true racing exclusives. Take advantage of this 
    unique opportunity to get behind the wheel of a real legend and find out what 
    it's capable of beyond the racetrack!`;

    const mainDiscription = createEl('div', [CSS_CLASSES.mainPageDiscription], elementText)
    mainContainer.append(mainDiscription);

    const discountCodeContainer = createEl('div', [CSS_CLASSES.discountCodeContainer])
    mainContainer.append(discountCodeContainer);

    const discountCode = createEl('span', [CSS_CLASSES.discountCode], 'FIRSTORDERDISCOUNT');
    discountCodeContainer.append(discountCode);

    const discountCodeCopy = createEl('button', [CSS_CLASSES.submitDiscountCode], 'Copy code')
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
