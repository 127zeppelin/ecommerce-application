abstract class Registrations {
  protected container: HTMLElement

  public TextObject = {}

  constructor(id: string) {
    this.container = document.createElement('div')
    this.container.id = id
  }

  protected createRegistration(text: string) {
    const headerTitle = document.createElement('h1')
    headerTitle.innerText = text
    return headerTitle
  }

  render() {
    return this.container
  }
}

export default Registrations
