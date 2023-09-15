import { CSS_CLASSES } from '../../constants/cssclases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'

class CartPage extends Page {
  /*
  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }
*/
  getHashValue() {
    const hashValue = window.location.hash.substring(1)
    return hashValue
  }

  async getcarquery(containerMain: HTMLElement) {
    
  }

  render() {
    const containerMain = createHtmlElement({
      tagName: 'main',
      cssClass: [CSS_CLASSES.mainContainer],
    })
    this.container.append(containerMain)
    const titleContainer: HTMLElement = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.titleCont],
    })
    containerMain.append(titleContainer)

    const title = this.createHeaderTitle('Card')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)
    this.getcarquery(containerMain)
    return this.container
  }
}

export default CartPage
