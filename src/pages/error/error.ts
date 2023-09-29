import { CSS_CLASSES } from '../../constants/cssClases'
import Page from '../../temlates/page'
import { createEl } from '../../utils/createElement'

class ErrorPage extends Page {

  TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found.',
  }

  render() {
    const containerOuter = createEl('div', [CSS_CLASSES.cont])
    this.container.append(containerOuter)
    const title = createEl('h1', [CSS_CLASSES.pageTitle], '404')
    containerOuter.append(title)
    return this.container
  }
}

export default ErrorPage
