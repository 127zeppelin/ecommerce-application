import { CSS_CLASSES } from "../constants/cssClases"
import { createEl } from "../utils/createElement"

abstract class Component {
  protected container: HTMLElement

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName)
    this.container.className = className
  }

  protected createContainer() {
    const cont = createEl('div', [CSS_CLASSES.cont])
    const logo = createEl('div', [CSS_CLASSES.imgWrapper])
    const logoImg = createEl('img', undefined, undefined, ['./images/logo-2.png', 'AutoCar'])
    logo.append(logoImg)
    cont.append(logo)
    return cont
  }

  render() {
    return this.container
  }
}

export default Component