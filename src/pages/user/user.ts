import Page from '../../temlates/page'
import { getUser } from './getuserInfo'
import { createUserPage } from './createUsepPage';

import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { CSS_CLASSES } from '../../constants/cssClases';
import { createHtmlElement } from '../../utils/createElement';

class CustomerPage extends Page {
  async createUserPageWithTheReceivedData(container: HTMLElement) {
    try {
      const apiRequest = await getUser()
      const apiResponce: ClientResponse<Customer> = apiRequest
      const createUserPageCont = createUserPage(apiResponce)
      container.append(createUserPageCont)
    }
    catch (error: any) {
      // eslint-disable-next-line
      console.log(error)
    }
  }

  render() {
    const containerOuter = document.createElement('div')
    const containerMain = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.mainContainer]
    })
    containerOuter.append(containerMain)
    const title = this.createHeaderTitle('User Page')
    title.className = 'pade-title'
    containerMain.append(title)
    this.createUserPageWithTheReceivedData(containerMain)
    ///this.redirectIfCustomerWithLogin()
    return containerOuter
  }
}
export default CustomerPage
