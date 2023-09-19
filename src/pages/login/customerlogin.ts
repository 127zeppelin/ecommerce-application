import { apiRoot, apiRootPass, userAuthOptions } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'

export const customerLogin = async (email: string, password: string): 
Promise<ClientResponse<CustomerSignInResult>> => {
  const requestBody = {
    email: email,
    password: password,
    updateProductData: true,
  }
  const customer = await apiRootPass
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .login()
    .post({ body: requestBody })
    .execute()
  return customer
}

