import { initializeClient, userAuthOptions, apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import { RequestBody } from '../../types/types'
import {
  CustomerUpdateAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'

export const customerRegistr = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  streetName: string,
  postalCode: string,
  city: string,
  country: string,
  streetNameBill: string,
  postalCodeBill: string,
  cityBill: string,
  countryBill: string,
  oneAdress: boolean
): Promise<ClientResponse<CustomerSignInResult>> => {
  userAuthOptions.username = email;
  userAuthOptions.password = password;
  initializeClient(false);
  const request = oneAdress
    ? apiRoot
      .withProjectKey({ projectKey: PROJECT_KEY })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          addresses: [
            {
              streetName: streetName,
              postalCode: postalCode,
              city: city,
              country: country,
            },
          ],

        },
      })
    : apiRoot
      .withProjectKey({ projectKey: PROJECT_KEY })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          addresses: [
            {
              streetName: streetName,
              postalCode: postalCode,
              city: city,
              country: country,
            },
            {
              streetName: streetNameBill,
              postalCode: postalCodeBill,
              city: cityBill,
              country: countryBill,
            },
          ],
        },
      })

  const response = await request.execute()
  const cartId = response.body.cart?.id
  const cartState = response.body.cart?.cartState;
  if (cartId && cartState === 'Active') {
    localStorage.setItem('curent_cart_id', cartId)
  } else {
    localStorage.removeItem('curent_cart_id')
  };
  return response
}

export const setAddressOptions = (
  customerId: string,
  version: number,
  addressIdShiping: string,
  addressIdBilling: string,
  checkDefaultShippingAddress: boolean,
  checkDefaultBillingAddress: boolean,
  onlyAdress: boolean
) => {
  let requestBody: RequestBody = {
    body: {
      version: version,
      actions: [
        {
          action: 'addShippingAddressId',
          addressId: addressIdShiping,
        },
      ],
    },
  }

  const setDefaultShippingAddress: CustomerSetDefaultShippingAddressAction = {
    action: 'setDefaultShippingAddress',
    addressId: addressIdShiping,
  }
  const setDefaultBillingAddress: CustomerSetDefaultBillingAddressAction = {
    action: 'setDefaultBillingAddress',
    addressId: addressIdBilling,
  }

  const setOnlyOneAddress: CustomerUpdateAction = onlyAdress
    ? { action: 'addBillingAddressId', addressId: addressIdShiping }
    : { action: 'addBillingAddressId', addressId: addressIdBilling }

  requestBody.body.actions.push(setOnlyOneAddress)

  if (checkDefaultShippingAddress) {
    requestBody.body.actions.push(setDefaultShippingAddress)
  }

  if (checkDefaultBillingAddress) {
    requestBody.body.actions.push(setDefaultBillingAddress)
  }
  initializeClient(true);
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .customers()
    .withId({ ID: customerId })
    .post(requestBody)
    .execute()
}
