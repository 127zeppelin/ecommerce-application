import { createEl } from "../utils/createElement"

abstract class Page {
  protected container: HTMLElement

  public TextObject = {}

  constructor(id: string) {
    this.container = createEl('div')
    this.container.id = id
  }
  
  render() {
    return this.container
  }
}

export default Page
