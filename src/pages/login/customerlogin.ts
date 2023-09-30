import { apiRoot, initializeClient, userAuthOptions } from '../../components/api'
import { PROJECT_KEY } from '../../constants/apiConstants'
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'
import { encodePasswordAndUsername } from '../../utils/encodePass'


export const customerLogin = async (email: string, password: string):
Promise<ClientResponse<CustomerSignInResult>> => {
  const cartId = localStorage.getItem('curent_cart_id')
  const requestBody = {
    email: email,
    password: password,
    updateProductData: true,
    anonymousCart: {
      id: `{{${cartId}}}`,
      typeId: "cart"
    }
  }
  // const userLogin = isTheUserLoggedIn()
  // initializeClient(userLogin);
  userAuthOptions.username = email;
  userAuthOptions.password = password;
  encodePasswordAndUsername(email, password)
 
  localStorage.setItem('username', email);
  localStorage.setItem('password', password)
  initializeClient(true);
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .login()
    .post({ body: requestBody })
    .execute()
    .then(data => {
      const cartIdCustomerWithLogin = data.body.cart?.id
      const cartState = data.body.cart?.cartState;
      if (cartIdCustomerWithLogin && cartState === 'Active') {
        localStorage.setItem('curent_cart_id', cartIdCustomerWithLogin)
      } else {
        localStorage.removeItem('curent_cart_id')
      };
      return data;
    })
}

