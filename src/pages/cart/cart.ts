import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createEl } from '../../utils/createElement'
import { createCartPage } from './cartPageCreate'

class CartPage extends Page {

  render() {
    const containerMain = createEl('main', [CSS_CLASSES.mainContainer])
    this.container.append(containerMain)

    const titleContainer: HTMLElement = createEl('div', [CSS_CLASSES.titleCont])
    containerMain.append(titleContainer)

    const cartContainer = createEl('div', [CSS_CLASSES.cartContainer])
    const title = createEl('h1', [CSS_CLASSES.pageTitle], 'Cart')
    titleContainer.append(title)
    containerMain.append(cartContainer)
    createCartPage(cartContainer)

    return this.container
  }
}

export default CartPage
