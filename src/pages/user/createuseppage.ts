import { CSS_CLASSES } from "../../constants/cssClases"
import { createEl } from "../../utils/createElement"
import { Address, ClientResponse, Customer } from "@commercetools/platform-sdk"


const addressOptions = (adressId: string, body: Customer, inputContainer: HTMLElement) => {
  const adressesArrays = [
    body.shippingAddressIds,
    body.defaultShippingAddressId,
    body.billingAddressIds,
    body.defaultBillingAddressId,
  ]
  adressesArrays.forEach((adressesOptionArr)=>{
    const elementText = adressesOptionArr === body.shippingAddressIds ? 'Shipping Address' :
      adressesOptionArr === body.billingAddressIds ? 'Billing Address' :
        adressesOptionArr === body.defaultBillingAddressId ? 'Default Billing Address' :
          'Default Shipping Address';
    if (adressesOptionArr?.includes(adressId)) {
      const userDataInput = createEl('span', [CSS_CLASSES.inputArea, CSS_CLASSES.addressOption], elementText)
      inputContainer.append(userDataInput);
    }
  })
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
    const inputContainer = createEl('div', [CSS_CLASSES.userInputContainer],
      `<span class="${CSS_CLASSES.inputLabel}">${dataKey}:</span>`);
    userProfileContainer.append(inputContainer);
    const fieldData = userBody[dataKey] !== undefined ? userBody[dataKey] : 'Not filled in';
    const userDataInput = createEl('span', [CSS_CLASSES.inputArea], fieldData);
    userDataInput.id = dataKey.replace(/ /g, '_').toLocaleLowerCase();
    inputContainer.append(userDataInput)
    const userDataEdit = createEl('button', [CSS_CLASSES.userDataEditBtn], `<img src="./images/pencil.svg">`)
    inputContainer.append(userDataEdit)
  }
}

const сreatingUserAddressesBlock = (userData: ClientResponse<Customer>, userAdressesContainer: HTMLElement) => {
  const customerAdresses: Address[] = userData.body.addresses;
  customerAdresses.forEach((adress)=>{
    const customerAdressesData: Record<string, string | undefined> = {
      'id': adress.id,
      'Apartment': adress?.apartment,
      'Building': adress?.building,
      'City': adress?.city,
      'Country': adress.country,
      'Postal Code': adress?.postalCode,
      'Street Name': adress?.streetName
    }
    const oneAddressContainer = createEl('div', [CSS_CLASSES.oneAddressContainer])
    const adressId = adress.id as string
    userAdressesContainer.append(oneAddressContainer)
    for (const adressItem in customerAdressesData) {
      if (adressItem !== 'id') {
        const inputContainer = createEl('div', [CSS_CLASSES.userInputContainer],
          `<span class="${CSS_CLASSES.inputLabel}">${adressItem}:</span>`);
        oneAddressContainer.append(inputContainer)

        const userDataInput = createEl('span', [CSS_CLASSES.inputArea], customerAdressesData[adressItem]);
        userDataInput.id = adressItem.replace(/ /g, '_').toLocaleLowerCase();
        inputContainer.append(userDataInput);
      } else {
        const inputContainer = createEl('div', [CSS_CLASSES.userInputContainer],
          `<span class="${CSS_CLASSES.inputLabel}">This address is:</span>`)
        oneAddressContainer.append(inputContainer)
        addressOptions(adressId, userData.body, inputContainer)
      }
    }
  })
}

export const createUserPage = (userData: ClientResponse<Customer>) => {
  const userPageContainer = createEl('div', [CSS_CLASSES.containerUserPage])
  const userProfileContainer = createEl('div', [CSS_CLASSES.containerUserProfile])
  userPageContainer.append(userProfileContainer)

  const userProfileTitle = createEl('h2', [CSS_CLASSES.containerUserProfile], 'Customer Info')
  userProfileContainer.append(userProfileTitle)

  const userAdressesContainer = createEl('div', [CSS_CLASSES.containerUserAddresses])
  userPageContainer.append(userAdressesContainer)

  const userAddressesTitle = createEl('h2', [CSS_CLASSES.containerUserProfile], 'Customer Addresses')
  userAdressesContainer.append(userAddressesTitle)

  сreatingUserInformationBlock(userData, userProfileContainer)

  сreatingUserAddressesBlock(userData, userAdressesContainer)
  return userPageContainer
}

