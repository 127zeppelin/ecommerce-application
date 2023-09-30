import Page from '../../temlates/page'
import { getUser } from './getuserInfo'
import { createUserPage } from './createUsepPage';

import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { CSS_CLASSES } from '../../constants/cssClases';
import { createEl } from '../../utils/createElement';

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
    const containerOuter = createEl('div')
    const containerMain = createEl('div', [CSS_CLASSES.mainContainer])
    containerOuter.append(containerMain)
    const title = createEl('h1', [CSS_CLASSES.pageTitle], 'User Page')
    containerMain.append(title)
    this.createUserPageWithTheReceivedData(containerMain)
    return containerOuter
  }
}
export default CustomerPage
