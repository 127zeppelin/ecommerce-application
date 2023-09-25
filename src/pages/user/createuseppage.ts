import { CSS_CLASSES } from "../../constants/cssClases"
import { createHtmlElement } from "../../utils/createElement"
import { Address, ClientResponse, Customer } from "@commercetools/platform-sdk"


const addressOptions = (adressId: string, body: Customer, inputContainer: HTMLElement) => {
  const adressesArrays = [
    body.shippingAddressIds,
    body.defaultShippingAddressId,
    body.billingAddressIds,
    body.defaultBillingAddressId,
  ]
  for (const adressesOptionArr of adressesArrays) {
    const elementText = adressesOptionArr === body.shippingAddressIds ? 'Shipping Address' :
      adressesOptionArr === body.billingAddressIds ? 'Billing Address' :
        adressesOptionArr === body.defaultBillingAddressId ? 'Default Billing Address' :
          'Default Shipping Address';
    if (adressesOptionArr?.includes(adressId)) {
      const userDataInput = createHtmlElement({
        tagName: 'span',
        cssClass: [CSS_CLASSES.inputArea, CSS_CLASSES.addressOption],
        elementText: elementText
      })
      inputContainer.append(userDataInput);
    }
  }
}

const сreatingUserInformationBlock = (userData: ClientResponse<Customer>, userProfileContainer: HTMLElement) => {
  const userBody: Record<string, string | undefined> = {
    'User Email': userData.body?.email,
    'Name': userData.body?.firstName,
    'Last Name': userData.body?.lastName,
    'Middle Name': userData.body?.middleName,
    'Date Of Birds': userData.body?.dateOfBirth,
    'Password': userData.body?.password
  }
  for (const dataKey in userBody) {
    const inputContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.userInputContainer],
      elementHtml: `<span class="${CSS_CLASSES.inputLabel}">${dataKey}:</span>`,
    })
    userProfileContainer.append(inputContainer)

    const userDataInput = createHtmlElement({
      tagName: 'span',
      cssClass: [CSS_CLASSES.inputArea],
      elementText: userBody[dataKey] !== undefined ? userBody[dataKey] : 'Not filled in',
      elementId: dataKey.replace(/ /g, '_').toLocaleLowerCase()
    })
    inputContainer.append(userDataInput)
    const userDataEdit = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.userDataEditBtn],
      elementHtml: `<img src="./images/pencil.svg">`

    })
    inputContainer.append(userDataEdit)
  }
}

const сreatingUserAddressesBlock = (userData: ClientResponse<Customer>, userAdressesContainer: HTMLElement) => {
  const customerAdresses: Address[] = userData.body.addresses;
  for (const adress of customerAdresses) {
    const customerAdressesData: Record<string, string | undefined> = {
      'id': adress.id,
      'Apartment': adress?.apartment,
      'Building': adress?.building,
      'City': adress?.city,
      'Country': adress.country,
      'Postal Code': adress?.postalCode,
      'Street Name': adress?.streetName
    }
    const oneAddressContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.oneAddressContainer],
    })
    const adressId = adress.id as string
    userAdressesContainer.append(oneAddressContainer)
    for (const adressItem in customerAdressesData) {
      if (adressItem !== 'id') {
        const inputContainer = createHtmlElement({
          tagName: 'div',
          cssClass: [CSS_CLASSES.userInputContainer],
          elementHtml: `<span class="${CSS_CLASSES.inputLabel}">${adressItem}:</span>`,
        })
        oneAddressContainer.append(inputContainer)

        const userDataInput = createHtmlElement({
          tagName: 'span',
          cssClass: [CSS_CLASSES.inputArea],
          elementText: customerAdressesData[adressItem],
          elementId: adressItem.replace(/ /g, '_').toLocaleLowerCase()
        })
        inputContainer.append(userDataInput);
      } else {
        const inputContainer = createHtmlElement({
          tagName: 'div',
          cssClass: [CSS_CLASSES.userInputContainer],
          elementHtml: `<span class="${CSS_CLASSES.inputLabel}">This address is:</span>`,
        })
        oneAddressContainer.append(inputContainer)

        addressOptions(adressId, userData.body, inputContainer)
      }
    }
  }
}

export const createUserPage = (userData: ClientResponse<Customer>) => {
  const userPageContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.containerUserPage]
  })
  const userProfileContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.containerUserProfile]
  })
  userPageContainer.append(userProfileContainer)

  const userProfileTitle = createHtmlElement({
    tagName: 'h2',
    cssClass: [CSS_CLASSES.containerUserProfile],
    elementText: 'Customer Info'
  })
  userProfileContainer.append(userProfileTitle)

  const userAdressesContainer = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.containerUserAddresses]
  })
  userPageContainer.append(userAdressesContainer)

  const userAddressesTitle = createHtmlElement({
    tagName: 'h2',
    cssClass: [CSS_CLASSES.containerUserProfile],
    elementText: 'Customer Addresses'
  })
  userAdressesContainer.append(userAddressesTitle)

  сreatingUserInformationBlock(userData, userProfileContainer)

  сreatingUserAddressesBlock(userData, userAdressesContainer)
  return userPageContainer
}

