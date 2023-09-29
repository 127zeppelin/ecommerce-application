import { initializeClient, userAuthOptions, apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/apiConstants'
import { RequestBody } from '../../types/types'
import {
  CustomerUpdateAction,
  CustomerSetDefaultShippingAddressAction,
  CustomerSetDefaultBillingAddressAction,
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'
import { encodePasswordAndUsername } from '../../utils/encodePass'
import { CSS_CLASSES } from '../../constants/cssClases'

function formatDateToISODateOnly(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}


export const customerRegistr = async (
  form: HTMLFormElement, oneAdress: boolean
): Promise<ClientResponse<CustomerSignInResult>> => {
  const registrLogin: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputEmail}`);
  const email = registrLogin?.value;
  const registrPass: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputPass}`);
  const password = registrPass?.value;
  const registrName: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputName}`);
  const firstName = registrName?.value;
  const registrSurname: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputSurname}`);
  const lastName = registrSurname?.value;
  const registrDateOfBirth: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputDate}`);
  const dateOfBirth: Date | undefined = registrDateOfBirth ? new Date(registrDateOfBirth.value) : undefined;
  const registrShipingStreet: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputShipStreet}`);
  const streetName = registrShipingStreet?.value;
  const registrShipingCity: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputShipCity}`);
  const city = registrShipingCity?.value;
  const registrShipingPostalCode: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputShipCode}`);
  const postalCode = registrShipingPostalCode?.value;
  const registrShipingCountry: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputCountryShip}`);
  const country = registrShipingCountry?.value;
  const registrBillingStreet: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputBillStreet}`);
  const streetNameBill = registrBillingStreet?.value;
  const registrBillingCity: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputBillCity}`);
  const cityBill = registrBillingCity?.value;
  const registrBillingPostalCode: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputBillCode}`);
  const postalCodeBill = registrBillingPostalCode?.value;
  const registrBillingCountry: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputBillCountry}`);
  const countryBill = registrBillingCountry?.value;

  if (email && password && firstName && lastName && dateOfBirth
    && streetName && postalCode && city && country && oneAdress) {
    const isoFormattedDate: string = formatDateToISODateOnly(dateOfBirth);
    userAuthOptions.username = email;
    userAuthOptions.password = password;
    localStorage.setItem('username', email);
    localStorage.setItem('password', password)
    encodePasswordAndUsername(email, password)
    initializeClient(false);
    const request = apiRoot
      .withProjectKey({ projectKey: PROJECT_KEY })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: isoFormattedDate,
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
    const response = await request.execute()
    const cartId = response.body.cart?.id
    const cartState = response.body.cart?.cartState;
    if (cartId && cartState === 'Active') {
      localStorage.setItem('curent_cart_id', cartId)
    } else {
      localStorage.removeItem('curent_cart_id')
    };
    return response
  } else if (email && password && firstName && lastName && dateOfBirth
    && streetName && postalCode && city && country && !oneAdress
    && streetNameBill && cityBill && postalCodeBill && countryBill) {
    userAuthOptions.username = email;
    userAuthOptions.password = password;
    const isoFormattedDate: string = formatDateToISODateOnly(dateOfBirth);
    const request = apiRoot
      .withProjectKey({ projectKey: PROJECT_KEY })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: isoFormattedDate,
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
  } else {
    throw new Error("Some required fields are missing");
  }
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
