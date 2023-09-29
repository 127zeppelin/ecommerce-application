import { createEl } from "../utils/createElement"

abstract class Registrations {
  protected container: HTMLElement

  public TextObject = {}

  constructor(id: string) {
    this.container = createEl('div')
    this.container.id = id
  }

  protected createRegistration(text: string) {
    const headerTitle = createEl('h1', undefined, text)
    return headerTitle
  }

  render() {
    return this.container
  }
}

export default Registrations
