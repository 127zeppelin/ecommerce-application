import { apiRoot, initializeClient, userAuthOptions } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'


export const customerLogin = async (email: string, password: string):
  Promise<ClientResponse<CustomerSignInResult>> => {
    const cartId = localStorage.getItem('curent_cart_id')
  const requestBody = {
    email: email,
    password: password,
    updateProductData: true,
    anonymousCart : {
      id : `{{${cartId}}}`,
      typeId : "cart"
    }
  }
  // const userLogin = isTheUserLoggedIn()
  // initializeClient(userLogin);
  userAuthOptions.username = email;
  userAuthOptions.password = password;
  initializeClient(true);
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .login()
    .post({ body: requestBody })
    .execute()
    .then(data => {
      const cartId = data.body.cart?.id
      const cartState = data.body.cart?.cartState;
      cartId && cartState === 'Active' ? localStorage.setItem('curent_cart_id', cartId) :
                                         localStorage.removeItem('curent_cart_id');

      return data;
    })

}

