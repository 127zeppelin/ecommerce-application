import Page from '../../temlates/page'
import { CSS_CLASSES } from '../../constants/cssclases'
import { createHtmlElement } from '../../utils/createelement'
import { getCar } from './getcar'
import { pageList } from '../pagelist'
import { createCarPage } from './getcar'

class CarPage extends Page {
  /*
  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }
*/
 getHashValue(){
  const hashValue = window.location.hash.substring(1); 
  return hashValue
 }

  async getcarquery(containerMain: HTMLElement) {
    const hash = this.getHashValue();
    try {

      const loadCarResult = await getCar(hash);
      const carData = loadCarResult.body
      createCarPage(carData, containerMain)
      console.log(carData)
    } catch (error: any) {
      console.log(error)
    }
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

    const title = this.createHeaderTitle('One cool car')
    title.className = CSS_CLASSES.pageTitle
    titleContainer.append(title)
    this.getcarquery(containerMain)
    return this.container
  }
}

export default CarPage
