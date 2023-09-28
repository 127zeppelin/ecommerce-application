import { createEl } from "../utils/createElement"

abstract class Component {
  protected container: HTMLElement

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName)
    this.container.className = className
  }

  protected createContainer() {
    const cont = createEl('div', ['container'])
    const logo = createEl('div', ['img_wrapper'])
    const logoImg = createEl('img')
    logoImg.src = './images/image (1).png'
    logoImg.alt = 'AutoCar'
    logo.append(logoImg)
    cont.append(logo)
    return cont
  }

  render() {
    return this.container
  }
}

export default Component