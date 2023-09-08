import { tokenStore } from '../../components/api';
import Page from '../../temlates/page'
import { getUser } from './getuserinfo'
import { isTheUserLoggedIn } from '../login/istheuserlogged';

class CustomerPage extends Page {
  // constructor(id: string) {
  //   super(id);
  // }
  async createUserPage() {
  
      const apiRequest = await getUser()
      const apiResponce = apiRequest
      console.log('apiResponce со страницы users', apiResponce)
      console.log('Токен Сторе на странице user', tokenStore)
  }
  
  render() {
    const containerOuter = document.createElement('div')
    containerOuter.className = 'container'
    this.container.append(containerOuter)
    const title = this.createHeaderTitle('User Page')
    title.className = 'pade-title'
    containerOuter.append(title)
    this.createUserPage()
    ///this.redirectIfCustomerWithLogin()
    return this.container
  }
}
export default CustomerPage
