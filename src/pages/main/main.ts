import { CSS_CLASSES } from '../../constants/cssclases'
import Page from '../../temlates/page'
import { createHtmlElement } from '../../utils/createelement'

class MainPage extends Page {
  
  render() {
    const containerOuter = document.createElement('div')
    containerOuter.className = CSS_CLASSES.mainContainer
    this.container.append(containerOuter)
    const mainContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.mainPageContent]
    })
    containerOuter.append(mainContainer);
    const title = this.createHeaderTitle('Premium car rental')
    title.className = 'pade-title'
    mainContainer.append(title)

    const mainDiscription = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.mainPageDiscription],
      elementText:`In our club, we have an impressive collection of sports cars — from fairly 
                  common production models to true racing exclusives. Take advantage of this 
                  unique opportunity to get behind the wheel of a real legend and find out what 
                  it's capable of beyond the racetrack!`
    })
    mainContainer.append(mainDiscription);

    return this.container
  }
}

export default MainPage
