import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createElement'
import { createCartPage } from './cartPageCreate'

class CartPage extends Page {

  getHashValue() {
    const hashValue = window.location.hash.substring(1)
    return hashValue
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

    const cartContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cartContainer]
    })
    const title = this.createHeaderTitle('Cart')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)
    containerMain.append(cartContainer)
    createCartPage(cartContainer)

    return this.container
  }
}

export default CartPage
