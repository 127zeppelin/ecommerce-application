import { CSS_CLASSES } from '../../constants/cssclases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'
import { createCartPage } from './cartpagecreate'

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
    const title = this.createHeaderTitle('Cart')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)
    const cartContainer = createCartPage()
    containerMain.append(cartContainer)
    return this.container
  }
}

export default CartPage
