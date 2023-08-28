import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'
import { RequestBody } from '../../components/types'

export const customerRegistr = (
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
) => {
  if (oneAdress) {
    return apiRoot
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
      .execute()
  } else if (!oneAdress) {
    return apiRoot
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
      .execute()
  }
  return apiRoot
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

  const setDefaultShippingAddress = {
    action: 'setDefaultShippingAddress',
    addressId: addressIdShiping,
  }
  const setDefaultBillingAddress = {
    action: 'setDefaultBillingAddress',
    addressId: addressIdBilling,
  }

  const setOnlyOneAddress = onlyAdress
    ? { action: 'addBillingAddressId', addressId: addressIdShiping }
    : { action: 'addBillingAddressId', addressId: addressIdBilling }

  requestBody.body.actions.push(setOnlyOneAddress)

  if (checkDefaultShippingAddress) {
    requestBody.body.actions.push(setDefaultShippingAddress)
  }

  if (checkDefaultBillingAddress) {
    requestBody.body.actions.push(setDefaultBillingAddress)
  }

  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .customers()
    .withId({ ID: customerId })
    .post(requestBody)
    .execute()
}
