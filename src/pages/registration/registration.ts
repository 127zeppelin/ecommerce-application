import Page from '../../temlates/page'
import { customerRegistr, setAddressOptions } from './customerregistration'
import { tokenStore } from '../../components/api'
import { showPasword } from '../../components/showpasword'
import { CSS_CLASSES } from '../../constants/cssclases'
import {
  checkResultValidation,
  handleEmailInputChange,
  handlePasswordInputChange,
  checkResultValidationRestration,
} from '../../components/validationinput'
import { BODY, RESOLVE_MESSAGE } from '../../components/constants'
import { createHtmlElement } from '../../utils/createelement'
import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk/dist/declarations/src'

class RegistrationPage extends Page {
  TextObject = {
    MainTitle: 'Registration Page',
  }

  private createPageButtons(href: string, text: string) {
    const pageButton = document.createElement('div')
    const loginBtn = document.createElement('a')
    pageButton.className = 'login__btn'
    loginBtn.href = href
    loginBtn.innerText = text
    pageButton.append(loginBtn)
    return pageButton
  }

  private renderLogin(
    className: string,
    type: string,
    id: string,
    placeholder: string
  ) {
    const input = document.createElement('input')
    input.className = className
    input.type = type
    input.id = id
    input.placeholder = placeholder
    return input
  }

  private createCountry(
    value: string,
    inputCountry: HTMLDataListElement,
    elemText: string
  ) {
    const country = document.createElement('option')
    country.value = value
    country.innerText = elemText
    inputCountry.append(country)
  }

  private createDefaultAdress(
    id: string,
    AdressWrapper: HTMLElement
  ): HTMLElement {
    const defaultAdressWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.defaultAddrWrapper],
    })
    let defaultAdress = document.createElement('input')
    defaultAdress.type = 'checkbox'
    defaultAdress.name = 'default-adress'
    defaultAdress.value = 'value'
    defaultAdress.id = id

    var label = document.createElement('label')
    label.htmlFor = id
    label.className = 'label__adress'
    label.appendChild(document.createTextNode('Set as a default address'))

    defaultAdressWrapper.appendChild(defaultAdress)
    defaultAdressWrapper.appendChild(label)

    AdressWrapper.appendChild(defaultAdressWrapper)
    return label
  }

  submitRegistrForm(form: HTMLElement) {
    const registrLogin: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputEmail}`
    )
    const registrPass: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputPass}`
    )
    const registrName: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputName}`
    )
    const registrSurname: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputSurname}`
    )
    const registrDateOfBirth: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputDate}`
    )
    const registrShipingStreet: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputShipStreet}`
    )
    const registrShipingCity: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputShipCity}`
    )
    const registrShipingPostalCode: HTMLInputElement | null =
      form.querySelector(`.${CSS_CLASSES.inputShipCode}`)
    const registrShipingCountry: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputCountryShip}`
    )
    const onlyOneAdress: HTMLInputElement | null = form.querySelector('.same')
    const registrBillingStreet: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputBillStreet}`
    )
    const registrBillingCity: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputBillCity}`
    )
    const registrBillingPostalCode: HTMLInputElement | null =
      form.querySelector(`.${CSS_CLASSES.inputBillCode}`)
    const registrBillingCountry: HTMLInputElement | null = form.querySelector(
      `.${CSS_CLASSES.inputBillCountry}`
    )
    const registrSubmit: HTMLButtonElement | null = form.querySelector(
      `.${CSS_CLASSES.registrSubmitBtn}`
    )

    const invalidInputMessageEmail: HTMLElement = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.validationMsg],
    })
    registrLogin?.insertAdjacentElement('afterend', invalidInputMessageEmail)
    let resultEmail: boolean = false

    const invalidInputMessagePass: HTMLElement = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.validationMsg],
    })
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
    const billingAdressWrapper: HTMLElement | null = form.querySelector(
      `.${CSS_CLASSES.billlingAddrWrapper}`
    )
    onlyOneAdress?.addEventListener('click', function () {
      billingAdressWrapper?.classList.toggle('hidden')
      onlyOneAdressValue = !onlyOneAdressValue
    })

    let defaultShipingAddressValue: boolean = false
    const addDefaultShipAddresOrNo: HTMLElement | null = form.querySelector(
      `.${CSS_CLASSES.checkDefaultShipAddr}`
    )
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

    if (
      registrLogin &&
      registrPass &&
      registrName &&
      registrSurname &&
      registrDateOfBirth &&
      registrShipingCountry &&
      registrShipingStreet &&
      registrShipingCity &&
      registrShipingPostalCode &&
      registrBillingCountry &&
      registrBillingStreet &&
      registrBillingCity &&
      registrBillingPostalCode &&
      registrSubmit
    ) {
      registrSubmit.addEventListener('click', async (event) => {
        event.preventDefault()

        const registrLoginValue: string = registrLogin.value
        const registrPassValue: string = registrPass.value
        const registrNameValue: string = registrName.value
        const registrSurnameValue: string = registrSurname.value
        const registrDateOfBirthValue: Date = new Date(registrDateOfBirth.value)
        const registrShipingCountryValue: string = registrShipingCountry.value
        const registrShipingStreetValue: string = registrShipingStreet.value
        const registrShipingCityValue: string = registrShipingCity.value
        const registrShipingPostalCodeValue: string =
          registrShipingPostalCode.value
        const registrBillingCountryValue: string = registrBillingCountry.value
        const registrBillingStreetValue: string = registrBillingStreet.value
        const registrBillingCityValue: string = registrBillingCity.value
        const registrBillingPostalCodeValue: string =
          registrBillingPostalCode.value
        function formatDateToISODateOnly(date: Date): string {
          const year = date.getFullYear()
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')

          return `${year}-${month}-${day}`
        }
        const isoFormattedDate: string = formatDateToISODateOnly(
          registrDateOfBirthValue
        )

        const resultValidation = checkResultValidationRestration(
          registrLogin,
          registrPass,
          registrName,
          registrSurname,
          registrDateOfBirth,
          registrShipingStreet,
          registrShipingCity,
          registrShipingPostalCode,
          registrShipingCountry,
          onlyOneAdressValue,
          registrBillingStreet,
          registrBillingCity,
          registrBillingPostalCode,
          registrBillingCountry,
          registrSubmit
        )

        if (!resultValidation) {
          RESOLVE_MESSAGE.classList.add('resolve')
          RESOLVE_MESSAGE.innerText = 'All fields must be filled'
          BODY?.append(RESOLVE_MESSAGE)
          setTimeout(() => {
            RESOLVE_MESSAGE.remove()
          }, 5000)
          return
        }

        try {
          const resultRegistr = await customerRegistr(
            registrLoginValue,
            registrPassValue,
            registrNameValue,
            registrSurnameValue,
            isoFormattedDate,
            registrShipingStreetValue,
            registrShipingPostalCodeValue,
            registrShipingCityValue,
            registrShipingCountryValue,
            registrBillingStreetValue,
            registrBillingPostalCodeValue,
            registrBillingCityValue,
            registrBillingCountryValue,
            onlyOneAdressValue
          )

          const apiResponse: ClientResponse<CustomerSignInResult> =
            resultRegistr
          const customerId: string = apiResponse.body.customer.id
          const customerIdVersion: number = apiResponse.body.customer.version
          const shipingAddressId: string | undefined =
            apiResponse.body.customer.addresses[0].id
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
          const resolveMessage = createHtmlElement({
            tagName: 'div',
            cssClass: [CSS_CLASSES.resolveMsg, CSS_CLASSES.successfully],
          })

          if (
            resolveMessage instanceof HTMLElement &&
            BODY instanceof HTMLElement
          ) {
            resolveMessage.innerText = 'Registration in successfully'
            BODY.append(resolveMessage)
            setTimeout(() => {
              resolveMessage.remove()
            }, 5000)
            window.location.href = './#main'
          }
        } catch (error: any) {
          RESOLVE_MESSAGE.classList.add(CSS_CLASSES.resolveMsg)
          if (
            RESOLVE_MESSAGE instanceof HTMLElement &&
            BODY instanceof HTMLElement
          ) {
            RESOLVE_MESSAGE.innerText = error.message
            BODY.append(RESOLVE_MESSAGE)
            setTimeout(() => {
              RESOLVE_MESSAGE.remove()
            }, 5000)
          }
        }
      })
    }
  }

  render() {
    const cont = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cont],
    })
    const formWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.formWrap],
    })
    const registrationForm = createHtmlElement({
      tagName: 'form',
      cssClass: [CSS_CLASSES.registrationForm],
    })
    formWrapper.append(registrationForm)
    cont.append(formWrapper)

    const pageButtons = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.pageBtns],
    })
    let pageButton = this.createPageButtons('#login', 'Log in')
    pageButtons.append(pageButton)
    pageButton = this.createPageButtons('#registration', 'Sign up')
    pageButtons.append(pageButton)
    pageButton.classList.add('login__btn_active')
    registrationForm.append(pageButtons)

    const pageText = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.registrationPageText],
    })
    const pageTextParagraph = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.registrationPageTextParagraph],
      elementText: 'Create an account',
    })
    pageText.append(pageTextParagraph)
    registrationForm.append(pageText)

    const loginEmailContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    registrationForm.append(loginEmailContainer)

    const inputLogin = this.renderLogin(
      'input__email',
      'email',
      'username',
      'Email'
    )
    loginEmailContainer.append(inputLogin)

    const paswordInputContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    registrationForm.append(paswordInputContainer)

    const inputPass = this.renderLogin(
      'input__password',
      'password',
      'password',
      'Password'
    )
    paswordInputContainer.append(inputPass)
    showPasword(inputPass)

    const inputNameContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    registrationForm.append(inputNameContainer)

    const inputName = this.renderLogin(
      CSS_CLASSES.inputName,
      'text',
      'name',
      'Name'
    )
    inputNameContainer.append(inputName)

    const surnameInputContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    registrationForm.append(surnameInputContainer)

    const inputSurname = this.renderLogin(
      CSS_CLASSES.inputSurname,
      'text',
      'surname',
      'Surname'
    )
    surnameInputContainer.append(inputSurname)

    const inputDateOfBirthContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    registrationForm.append(inputDateOfBirthContainer)

    const inputDateOfBirthLabel = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.dateText],
      elementText: 'Date of birth:',
    })
    inputDateOfBirthContainer.append(inputDateOfBirthLabel)

    const inputDateOfBirth = this.renderLogin(
      CSS_CLASSES.inputDate,
      'date',
      'date',
      '01.01.1970'
    )
    inputDateOfBirthContainer.append(inputDateOfBirth)

    const shippingAdressWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.shipingAddrWrapper],
    })
    registrationForm.append(shippingAdressWrapper)

    const shipingAdressTitle = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.registrationPageTextParagraph],
      elementText: 'Shipping address',
    })
    shippingAdressWrapper.append(shipingAdressTitle)

    const inputShipingStreetContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    shippingAdressWrapper.append(inputShipingStreetContainer)

    const inputShipingStreet = this.renderLogin(
      CSS_CLASSES.inputShipStreet,
      'text',
      'shipping-street',
      'Street'
    )
    inputShipingStreetContainer.append(inputShipingStreet)

    const inputCityShippingContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    shippingAdressWrapper.append(inputCityShippingContainer)

    const inputShippingCity = this.renderLogin(
      CSS_CLASSES.inputShipCity,
      'text',
      'shipping-city',
      'City'
    )
    inputCityShippingContainer.append(inputShippingCity)

    const inputShippingCodeContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    shippingAdressWrapper.append(inputShippingCodeContainer)

    const inputShipingCode = this.renderLogin(
      CSS_CLASSES.inputShipCode,
      'text',
      'shipping-code',
      'Postal code'
    )
    inputShippingCodeContainer.append(inputShipingCode)

    const inputCountryShippingContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    shippingAdressWrapper.append(inputCountryShippingContainer)

    const inputShippingCountry = document.createElement('input')
    inputShippingCountry.className = CSS_CLASSES.inputCountryShip
    inputShippingCountry.setAttribute('list', 'country')
    inputShippingCountry.id = 'shipping-country'
    inputShippingCountry.placeholder = 'Country'

    inputCountryShippingContainer.append(inputShippingCountry)

    const inputCountryShip: HTMLDataListElement =
      document.createElement('datalist')
    inputCountryShip.id = 'country'

    this.createCountry('DE', inputCountryShip, 'Germany')
    this.createCountry('PL', inputCountryShip, 'Poland')
    this.createCountry('BY', inputCountryShip, 'Belarus')
    this.createCountry('AT', inputCountryShip, 'Austria')
    this.createCountry('CA', inputCountryShip, 'Canada')

    inputCountryShippingContainer.append(inputCountryShip)

    this.createDefaultAdress(
      CSS_CLASSES.checkDefaultShipAddr,
      shippingAdressWrapper
    )

    const sameAdressWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.addrWrapp],
    })
    sameAdressWrapper.className = 'same-adress_wrapper'

    const sameAdress = document.createElement('input')
    sameAdress.className = 'same'
    sameAdress.type = 'checkbox'
    sameAdress.name = 'same-adress'
    sameAdress.value = 'value'
    sameAdress.id = 'same-adress'

    const labelOnlyAdres = document.createElement('label')
    labelOnlyAdres.htmlFor = 'same-adress'
    labelOnlyAdres.className = CSS_CLASSES.inputOneAdressCheck
    labelOnlyAdres.appendChild(
      document.createTextNode('Use the same address for billing and shipping')
    )

    sameAdressWrapper.appendChild(sameAdress)
    sameAdressWrapper.appendChild(labelOnlyAdres)

    registrationForm.appendChild(sameAdressWrapper)

    const billingAdressWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.billlingAddrWrapper],
    })
    registrationForm.append(billingAdressWrapper)

    const billingAdressTitle = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.registrationPageTextParagraph],
      elementText: 'Billing address',
    })
    billingAdressWrapper.append(billingAdressTitle)

    const inputBillingStreetContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    billingAdressWrapper.append(inputBillingStreetContainer)

    const inputBillingStreet = this.renderLogin(
      CSS_CLASSES.inputBillStreet,
      'text',
      'billing-street',
      'Street'
    )
    inputBillingStreetContainer.append(inputBillingStreet)

    const inputBillingCityContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    billingAdressWrapper.append(inputBillingCityContainer)

    const inputBillingCity = this.renderLogin(
      CSS_CLASSES.inputBillCity,
      'text',
      'billing-city',
      'City'
    )
    inputBillingCityContainer.append(inputBillingCity)

    const inputBillingZipContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    billingAdressWrapper.append(inputBillingZipContainer)

    const inputBillingCode = this.renderLogin(
      CSS_CLASSES.inputBillCode,
      'text',
      'billing-code',
      'Postal code'
    )
    inputBillingZipContainer.append(inputBillingCode)

    const inputBillingCountryContainer = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    billingAdressWrapper.append(inputBillingCountryContainer)

    const inputBillingCountry = document.createElement('input')
    inputBillingCountry.className = CSS_CLASSES.inputBillCountry
    inputBillingCountry.setAttribute('list', 'country')
    inputBillingCountry.id = 'billing-country'
    inputBillingCountry.placeholder = 'Country'

    inputBillingCountryContainer.append(inputBillingCountry)

    const inputCountryBil: HTMLDataListElement =
      document.createElement('datalist')
    inputCountryBil.id = 'country'

    this.createCountry('BY', inputCountryBil, 'Belarus')
    this.createCountry('DE', inputCountryBil, 'Germany')
    this.createCountry('PL', inputCountryBil, 'Poland')
    this.createCountry('AT', inputCountryBil, 'Austria')
    this.createCountry('CA', inputCountryBil, 'Canada')

    inputBillingCountryContainer.append(inputCountryBil)

    billingAdressWrapper.append(inputBillingCountryContainer)

    this.createDefaultAdress(
      CSS_CLASSES.checkDefaultBillAddr,
      billingAdressWrapper
    )

    const submitRegistrationWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.submitFormWrapper],
    })
    registrationForm.append(submitRegistrationWrapper)
    const registrSubmit = document.createElement('button')
    registrSubmit.classList.add('login__submit')
    registrSubmit.type = 'button'
    registrSubmit.id = 'login-submit'
    registrSubmit.disabled = true
    registrSubmit.textContent = 'Sign up'

    submitRegistrationWrapper.append(registrSubmit)
    this.submitRegistrForm(registrationForm)

    this.container.append(cont)

    return this.container
  }
}

export default RegistrationPage
