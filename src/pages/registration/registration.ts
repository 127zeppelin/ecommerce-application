import Page from '../../temlates/page'
import { customerRegistr, setAddressOptions } from './customerRegistration'
import { tokenStore } from '../../components/api'
import { addShowHidePaswordBtn } from '../../utils/showHidePasword'
import { CSS_CLASSES } from '../../constants/cssClases'
import {
  checkResultValidation,
  handleEmailInputChange,
  handlePasswordInputChange,
  checkResultValidationRestration,
} from '../../utils/validationInput'
import { createEl } from '../../utils/createElement'
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'
import { isTheUserLoggedIn } from '../login/isTheUserLogged'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'
import { createSelectionCountryList } from '../../utils/createSelectionCountryList'

class RegistrationPage extends Page {
  TextObject = {
    MainTitle: 'Registration Page',
  }

  private createPageButtons(href: string, text: string) {
    const btnLoginOrRegistr = createEl('div', [CSS_CLASSES.pageBtn]);
    const btnLoginOrRegistrLink = createEl('a', undefined, text, [href]);
    btnLoginOrRegistr.append(btnLoginOrRegistrLink)
    return btnLoginOrRegistr
  }

  private renderLogin(
    className: string,
    type: string,
    id: string,
    placeholder: string
  ) {
    const input = createEl('input', [className])
    input.type = type
    input.id = id
    input.placeholder = placeholder
    return input
  }

  redirectIfCustomerWithLogin() {
    const userHaveLogin = isTheUserLoggedIn()
    if (userHaveLogin) {
      window.location.hash = '#user'
    }
  }

  private createDefaultAdress(
    id: string,
    className: string, 
    AdressWrapper: HTMLElement
  ): HTMLElement {
    const defaultAdressWrapper = createEl('div', [CSS_CLASSES.defaultAddrWrapper])
    const defaultAdress = createEl('input', [className], 'value')
    defaultAdress.type = 'checkbox'
    defaultAdress.name = 'default-adress'
    defaultAdress.id = id

    var label = createEl('label', [CSS_CLASSES.inputOneAdressCheck])
    label.htmlFor = id
    label.appendChild(document.createTextNode('Set as a default address'))

    defaultAdressWrapper.appendChild(defaultAdress)
    defaultAdressWrapper.appendChild(label)

    AdressWrapper.appendChild(defaultAdressWrapper)
    return label
  }

  submitRegistrForm(form: HTMLFormElement) {
    const registrLogin: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputEmail}`);
    const registrPass: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.inputPass}`);
    const onlyOneAdress: HTMLInputElement | null = form.querySelector(`.${CSS_CLASSES.sameAdress}`);
    const registrSubmit: HTMLButtonElement | null = form.querySelector(`.${CSS_CLASSES.registrSubmitBtn}`);

    const invalidInputMessageEmail = createEl('div', [CSS_CLASSES.validationMsg])
    registrLogin?.insertAdjacentElement('afterend', invalidInputMessageEmail)
    let resultEmail: boolean = false

    const invalidInputMessagePass = createEl('div', [CSS_CLASSES.validationMsg])
    registrPass?.insertAdjacentElement('afterend', invalidInputMessagePass)
    let resultPassword: boolean = false
    if (!registrSubmit) {
      return
    }
    registrLogin?.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement
      resultEmail = handleEmailInputChange(
        inputTargetElement,
        invalidInputMessageEmail
      )
      checkResultValidation(resultEmail, resultPassword, registrSubmit)
    })

    registrPass?.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement
      resultPassword = handlePasswordInputChange(
        inputTargetElement,
        invalidInputMessagePass
      )
      checkResultValidation(resultEmail, resultPassword, registrSubmit)
    })

    let onlyOneAdressValue: boolean = false
    const billingAdressWrapper: HTMLElement | null = form.querySelector(`.${CSS_CLASSES.billlingAddrWrapper}`)
    onlyOneAdress?.addEventListener('click', function () {
      billingAdressWrapper?.classList.toggle('hidden')
      onlyOneAdressValue = !onlyOneAdressValue
    })

    let defaultShipingAddressValue: boolean = false
    const addDefaultShipAddresOrNo: HTMLElement | null = form.querySelector(`.${CSS_CLASSES.checkDefaultShipAddr}`);
    addDefaultShipAddresOrNo?.addEventListener('click', function () {
      defaultShipingAddressValue = !defaultShipingAddressValue
    })

    let defaultBillingAddressValue: boolean = false
    const addDefaultBillAddresOrNo: HTMLElement | null = form.querySelector(
      `.${CSS_CLASSES.checkDefaultBillAddr}`
    )
    addDefaultBillAddresOrNo?.addEventListener('click', function () {
      defaultBillingAddressValue = !defaultBillingAddressValue
    })

    if (registrSubmit) {
      registrSubmit.addEventListener('click', async (event) => {
        event.preventDefault();
        const resultValidation = checkResultValidationRestration(
          form,
          onlyOneAdressValue
        );
        const validate = await resultValidation;
        if (validate === false) {
          const resolveMessage: string = 'All fields must be filled';
          resolveMessageAddAndRemove(resolveMessage, false);
          return
        }

        try {
          const resultRegistr = await customerRegistr(form, onlyOneAdressValue)
          const apiResponse: ClientResponse<CustomerSignInResult> = resultRegistr;
          const customerId: string = apiResponse.body.customer.id
          const customerIdVersion: number = apiResponse.body.customer.version
          const shipingAddressId: string | undefined = apiResponse.body.customer.addresses[0].id
          const billingAddressId: string | undefined = onlyOneAdressValue
            ? apiResponse.body.customer.addresses[0].id
            : apiResponse.body.customer.addresses[1].id

          if (shipingAddressId && billingAddressId)
            await setAddressOptions(
              customerId,
              customerIdVersion,
              shipingAddressId,
              billingAddressId,
              defaultShipingAddressValue,
              defaultBillingAddressValue,
              onlyOneAdressValue
            )

          localStorage.setItem('access_token', tokenStore.token)
          localStorage.setItem(
            'expiration_time',
            String(tokenStore.expirationTime)
          )
          localStorage.setItem(
            'refresh_token',
            tokenStore.refreshToken ? tokenStore.refreshToken : ''
          )
          const resolveMessage: string = 'Registration in successfully';
          resolveMessageAddAndRemove(resolveMessage, true);
          window.location.hash = '#main'

        } catch (error: any) {
          const resolveMessage: string = error.message;
          resolveMessageAddAndRemove(resolveMessage, false);
        }
      })
    }
  }

  render() {
    this.redirectIfCustomerWithLogin()
    const cont = createEl('div', [CSS_CLASSES.cont])
    const formWrapper = createEl('div', [CSS_CLASSES.formWrap])
    const registrationForm = createEl('form', [CSS_CLASSES.registrationForm])
    formWrapper.append(registrationForm)
    cont.append(formWrapper)

    const pageButtons = createEl('div', [CSS_CLASSES.pageBtns])
    let pageButton = this.createPageButtons('#login', 'Log in')
    pageButtons.append(pageButton)
    pageButton = this.createPageButtons('#registration', 'Sign up')
    pageButtons.append(pageButton)
    pageButton.classList.add('login__btn_active')
    registrationForm.append(pageButtons)

    const pageText = createEl('div', [CSS_CLASSES.registrationPageText])
    const pageTextParagraph = createEl('div', [CSS_CLASSES.registrationPageTextParagraph], 'Create an account')
    pageText.append(pageTextParagraph)
    registrationForm.append(pageText)

    const loginEmailContainer = createEl('div', [CSS_CLASSES.inputContainer])
    registrationForm.append(loginEmailContainer)

    const inputLogin = this.renderLogin(
      'input__email', 'email', 'username', 'Email');
    loginEmailContainer.append(inputLogin)

    const paswordInputContainer = createEl('div', [CSS_CLASSES.inputContainer]);
    registrationForm.append(paswordInputContainer)

    const inputPass = this.renderLogin(
      'input__password', 'password', 'password', 'Password');
    paswordInputContainer.append(inputPass)
    addShowHidePaswordBtn(inputPass)

    const inputNameContainer = createEl('div', [CSS_CLASSES.inputContainer])
    registrationForm.append(inputNameContainer)

    const inputName = this.renderLogin(
      CSS_CLASSES.inputName,
      'text',
      'name',
      'Name'
    )
    inputNameContainer.append(inputName)

    const surnameInputContainer = createEl('div', [CSS_CLASSES.inputContainer])
    registrationForm.append(surnameInputContainer)

    const inputSurname = this.renderLogin(
      CSS_CLASSES.inputSurname,
      'text',
      'surname',
      'Surname'
    )
    surnameInputContainer.append(inputSurname)

    const inputDateOfBirthContainer = createEl('div', [CSS_CLASSES.inputContainer])
    registrationForm.append(inputDateOfBirthContainer)

    const inputDateOfBirthLabel = createEl('p', [CSS_CLASSES.dateText], 'Date of birth:')
    inputDateOfBirthContainer.append(inputDateOfBirthLabel)

    const inputDateOfBirth = this.renderLogin(CSS_CLASSES.inputDate, 'date', 'date', '01.01.1970'
    )
    inputDateOfBirthContainer.append(inputDateOfBirth)

    const shippingAdressWrapper = createEl('div', [CSS_CLASSES.shipingAddrWrapper])
    registrationForm.append(shippingAdressWrapper)

    const shipingAdressTitle = createEl('p', [CSS_CLASSES.registrationPageTextParagraph], 'Shipping address')
    shippingAdressWrapper.append(shipingAdressTitle)

    const inputShipingStreetContainer = createEl('div', [CSS_CLASSES.inputContainer])
    shippingAdressWrapper.append(inputShipingStreetContainer)

    const inputShipingStreet = this.renderLogin(CSS_CLASSES.inputShipStreet, 'text', 'shipping-street', 'Street')
    inputShipingStreetContainer.append(inputShipingStreet)

    const inputCityShippingContainer = createEl('div', [CSS_CLASSES.inputContainer])
    shippingAdressWrapper.append(inputCityShippingContainer)

    const inputShippingCity = this.renderLogin(
      CSS_CLASSES.inputShipCity,
      'text',
      'shipping-city',
      'City'
    )
    inputCityShippingContainer.append(inputShippingCity)

    const inputShippingCodeContainer = createEl('div', [CSS_CLASSES.inputContainer])
    shippingAdressWrapper.append(inputShippingCodeContainer)

    const inputShipingCode = this.renderLogin(
      CSS_CLASSES.inputShipCode,
      'text',
      'shipping-code',
      'Postal code'
    )
    inputShippingCodeContainer.append(inputShipingCode)

    const inputCountryShippingContainer = createEl('div', [CSS_CLASSES.inputContainer])
    shippingAdressWrapper.append(inputCountryShippingContainer)

    const inputShippingCountry = createEl('input', [CSS_CLASSES.inputCountryShip])
    inputShippingCountry.setAttribute('list', 'shipping-country-options')
    inputShippingCountry.id = 'shipping-country'
    inputShippingCountry.placeholder = 'Country'

    inputCountryShippingContainer.append(inputShippingCountry)
    createSelectionCountryList(inputCountryShippingContainer, 'shipping-country-options')

    this.createDefaultAdress(
      CSS_CLASSES.checkDefaultShipAddr,
      CSS_CLASSES.checkDefaultShipAddr,
      shippingAdressWrapper
    )

    const sameAdressWrapper = createEl('div', [CSS_CLASSES.addrWrapp])
    sameAdressWrapper.className = 'same-adress_wrapper'

    const sameAdress = createEl('input', [CSS_CLASSES.sameAdress], 'value')
    sameAdress.type = 'checkbox'
    sameAdress.id = 'same-adress'

    const labelOnlyAdres = createEl('label', [CSS_CLASSES.inputOneAdressCheck])
    labelOnlyAdres.htmlFor = 'same-adress'
    labelOnlyAdres.appendChild(document.createTextNode('Use the same address for billing and shipping'));
    sameAdressWrapper.appendChild(sameAdress)
    sameAdressWrapper.appendChild(labelOnlyAdres)

    registrationForm.appendChild(sameAdressWrapper)

    const billingAdressWrapper = createEl('div', [CSS_CLASSES.billlingAddrWrapper])
    registrationForm.append(billingAdressWrapper)

    const billingAdressTitle = createEl('p', [CSS_CLASSES.registrationPageTextParagraph], 'Billing address')
    billingAdressWrapper.append(billingAdressTitle)

    const inputBillingStreetContainer = createEl('div', [CSS_CLASSES.inputContainer])
    billingAdressWrapper.append(inputBillingStreetContainer)

    const inputBillingStreet = this.renderLogin(
      CSS_CLASSES.inputBillStreet,
      'text',
      'billing-street',
      'Street'
    )
    inputBillingStreetContainer.append(inputBillingStreet)

    const inputBillingCityContainer = createEl('div', [CSS_CLASSES.inputContainer])
    billingAdressWrapper.append(inputBillingCityContainer)

    const inputBillingCity = this.renderLogin(
      CSS_CLASSES.inputBillCity,
      'text',
      'billing-city',
      'City'
    )
    inputBillingCityContainer.append(inputBillingCity)

    const inputBillingZipContainer = createEl('div', [CSS_CLASSES.inputContainer])
    billingAdressWrapper.append(inputBillingZipContainer)

    const inputBillingCode = this.renderLogin(CSS_CLASSES.inputBillCode, 'text', 'billing-code', 'Postal code')
    inputBillingZipContainer.append(inputBillingCode)

    const inputBillingCountryContainer = createEl('div', [CSS_CLASSES.inputContainer])
    billingAdressWrapper.append(inputBillingCountryContainer)

    const inputBillingCountry = createEl('input', [CSS_CLASSES.inputBillCountry])
    inputBillingCountry.setAttribute('list', 'billing-country-options')
    inputBillingCountry.id = 'billing-country'
    inputBillingCountry.placeholder = 'Country'
    inputBillingCountryContainer.append(inputBillingCountry)

    createSelectionCountryList(inputBillingCountryContainer, 'billing-country-options')
    billingAdressWrapper.append(inputBillingCountryContainer)

    this.createDefaultAdress(
      CSS_CLASSES.checkDefaultBillAddr,
      CSS_CLASSES.checkDefaultBillAddr,
      billingAdressWrapper
    )

    const submitRegistrationWrapper = createEl('div', [CSS_CLASSES.submitFormWrapper])
    registrationForm.append(submitRegistrationWrapper)
    const registrSubmit = createEl('button', [CSS_CLASSES.submitBtn], 'Sign up')
    registrSubmit.type = 'button'
    registrSubmit.id = 'login-submit'
    registrSubmit.disabled = true

    submitRegistrationWrapper.append(registrSubmit)
    this.submitRegistrForm(registrationForm)

    this.container.append(cont)

    return this.container
  }
}

export default RegistrationPage
