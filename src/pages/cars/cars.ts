import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'
import { CSS_CLASSES } from '../../constants/cssclases'

class CarsPage extends Page {
  render() {
    const containerOuter = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cont],
    })
    this.container.append(containerOuter)
    const title = this.createHeaderTitle('Our Cars')
    title.className = CSS_CLASSES.pageTitle
    containerOuter.append(title)
    return this.container
  }
}

export default CarsPage
