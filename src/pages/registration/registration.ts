import Page from '../../temlates/page';
import { customerRegistr, setAddressOptions } from './customerregistration';
import { tokenStore } from '../../components/app-components/api';
import { showPasword } from '../../components/app-components/showpasword';
import {
  checkResultValidation,
  handleEmailInputChange,
  handlePasswordInputChange,
  checkResultValidationRestration,
} from '../../components/app-components/validationinput';
import {
  BODY,
  RESOLVE_MESSAGE,
} from '../../components/app-components/constants';

class RegistrationPage extends Page {
  TextObject = {
    MainTitle: 'Registration Page',
  };

  private createPageButtons(href: string, text: string) {
    const pageButton = document.createElement('div');
    const loginBtn = document.createElement('a');
    pageButton.className = 'login__btn';
    loginBtn.href = href;
    loginBtn.innerText = text;
    pageButton.append(loginBtn);
    return pageButton;
  }

  private renderLogin(
    className: string,
    type: string,
    id: string,
    placeholder: string,
  ) {
    const input = document.createElement('input');
    input.className = className;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
  }

  private createCountry(
    value: string,
    inputCountry: HTMLDataListElement,
    elemText: string,
  ) {
    const country = document.createElement('option');
    country.value = value;
    country.innerText = elemText;
    inputCountry.append(country);
  }

  private createDefaultAdress(
    id: string,
    AdressWrapper: HTMLElement,
  ): HTMLElement {
    let defaultAdressWrapper = document.createElement('div');
    defaultAdressWrapper.className = 'default-adress_wrapper';

    let defaultAdress = document.createElement('input');
    defaultAdress.type = 'checkbox';
    defaultAdress.name = 'default-adress';
    defaultAdress.value = 'value';
    defaultAdress.id = id;

    var label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'label__adress';
    label.appendChild(document.createTextNode('Set as a default address'));

    defaultAdressWrapper.appendChild(defaultAdress);
    defaultAdressWrapper.appendChild(label);

    AdressWrapper.appendChild(defaultAdressWrapper);
    return label;
  }

  submitRegistrForm(
    registrLogin: HTMLInputElement,
    registrPass: HTMLInputElement,
    registrName: HTMLInputElement,
    registrSurname: HTMLInputElement,
    registrDateOfBirth: HTMLInputElement,
    registrShipingCountry: HTMLInputElement,
    registrShipingStreet: HTMLInputElement,
    registrShipingPostalCode: HTMLInputElement,
    registrShipingCity: HTMLInputElement,
    registrBillingCountry: HTMLInputElement,
    registrBillingStreet: HTMLInputElement,
    registrBillingPostalCode: HTMLInputElement,
    registrBillingCity: HTMLInputElement,
    registrSubmit: HTMLButtonElement,
    onlyOneAdress: HTMLElement,
    billingAdressWrapper: HTMLElement,
    checkDefaultShipingAddress: HTMLElement,
    checkDefaultBillingAddress: HTMLElement,
  ) {
    const invalidInputMessageEmail: HTMLDivElement =
      document.createElement('div');
    invalidInputMessageEmail.classList.add('validation-message');
    registrLogin.insertAdjacentElement('afterend', invalidInputMessageEmail);
    let resultEmail: boolean = false;

    const invalidInputMessagePass: HTMLDivElement =
      document.createElement('div');
    invalidInputMessagePass.classList.add('validation-message');
    registrPass.insertAdjacentElement('afterend', invalidInputMessagePass);
    let resultPassword: boolean = false;

    registrLogin.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement;
      resultEmail = handleEmailInputChange(
        inputTargetElement,
        invalidInputMessageEmail,
      );
      checkResultValidation(resultEmail, resultPassword, registrSubmit);
    });

    registrPass.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement;
      resultPassword = handlePasswordInputChange(
        inputTargetElement,
        invalidInputMessagePass,
      );
      checkResultValidation(resultEmail, resultPassword, registrSubmit);
    });

    let onlyOneAdressValue: boolean = false;
    onlyOneAdress.addEventListener('click', function () {
      billingAdressWrapper.classList.toggle('hidden');
      onlyOneAdressValue = !onlyOneAdressValue;
      return onlyOneAdressValue;
    });

    let defaultShipingAddressValue: boolean = false;
    checkDefaultShipingAddress.addEventListener('click', function () {
      defaultShipingAddressValue = !defaultShipingAddressValue;
      console.log(defaultShipingAddressValue);
      return defaultShipingAddressValue;
    });

    let defaultBillingAddressValue: boolean = false;
    checkDefaultBillingAddress.addEventListener('click', function () {
      defaultBillingAddressValue = !defaultBillingAddressValue;
      return defaultBillingAddressValue;
    });

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
        event.preventDefault();

        const registrLoginValue: string = registrLogin.value;
        const registrPassValue: string = registrPass.value;
        const registrNameValue: string = registrName.value;
        const registrSurnameValue: string = registrSurname.value;
        const registrDateOfBirthValue: Date = new Date(
          registrDateOfBirth.value,
        );
        const registrShipingCountryValue: string = registrShipingCountry.value;
        const registrShipingStreetValue: string = registrShipingStreet.value;
        const registrShipingCityValue: string = registrShipingCity.value;
        const registrShipingPostalCodeValue: string =
          registrShipingPostalCode.value;
        const registrBillingCountryValue: string = registrBillingCountry.value;
        const registrBillingStreetValue: string = registrBillingStreet.value;
        const registrBillingCityValue: string = registrBillingCity.value;
        const registrBillingPostalCodeValue: string =
          registrBillingPostalCode.value;
        function formatDateToISODateOnly(date: Date): string {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');

          return `${year}-${month}-${day}`;
        }
        const isoFormattedDate: string = formatDateToISODateOnly(
          registrDateOfBirthValue,
        );

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
          registrSubmit,
        );

        if (!resultValidation) {
          RESOLVE_MESSAGE.classList.add('resolve');
          RESOLVE_MESSAGE.innerText = 'All fields must be filled';
          BODY?.append(RESOLVE_MESSAGE);
          setTimeout(() => {
            RESOLVE_MESSAGE.remove();
          }, 5000);
          return;
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
            onlyOneAdressValue,
          );

          const apiResponse = resultRegistr;
          const customerId: string = apiResponse.body.customer.id;
          const customerIdVersion: number = apiResponse.body.customer.version;
          const shipingAddressId: string =
            apiResponse.body.customer.addresses[0].id;
          const billingAddressId: string = onlyOneAdressValue
            ? apiResponse.body.customer.addresses[0].id
            : apiResponse.body.customer.addresses[1].id;

          await setAddressOptions(
            customerId,
            customerIdVersion,
            shipingAddressId,
            billingAddressId,
            defaultShipingAddressValue,
            defaultBillingAddressValue,
            onlyOneAdressValue,
          );

          localStorage.setItem('access_token', tokenStore.token);
          localStorage.setItem(
            'expiration_time',
            String(tokenStore.expirationTime),
          );
          localStorage.setItem(
            'refresh_token',
            tokenStore.refreshToken ? tokenStore.refreshToken : '',
          );
          const BODY: HTMLElement | null = document.querySelector('body');
          const resolveMessage: HTMLElement = document.createElement('div');
          resolveMessage.classList.add('resolve', 'successfully');

          if (
            resolveMessage instanceof HTMLElement &&
            BODY instanceof HTMLElement
          ) {
            resolveMessage.innerText = 'Registration in successfully';
            BODY.append(resolveMessage);
            setTimeout(() => {
              resolveMessage.remove();
            }, 5000);
            window.location.href = './#main';
          }
        } catch (error: any) {
          RESOLVE_MESSAGE.classList.add('resolve');
          if (
            RESOLVE_MESSAGE instanceof HTMLElement &&
            BODY instanceof HTMLElement
          ) {
            RESOLVE_MESSAGE.innerText = error.message;
            BODY.append(RESOLVE_MESSAGE);
            setTimeout(() => {
              RESOLVE_MESSAGE.remove();
            }, 5000);
          }
        }
      });
    }
  }

  render() {
    const cont = document.createElement('div');
    cont.className = 'container';
    const loginWrapper = document.createElement('div');
    loginWrapper.className = 'login__wrapper';
    const login = document.createElement('form');
    login.className = 'login';
    loginWrapper.append(login);
    cont.append(loginWrapper);

    const pageButtons = document.createElement('div');
    pageButtons.className = 'login__btns';
    let pageButton = this.createPageButtons('#login', 'Log in');
    pageButtons.append(pageButton);
    pageButton = this.createPageButtons('#registration', 'Sign up');
    pageButtons.append(pageButton);
    pageButton.classList.add('login__btn_active');
    login.append(pageButtons);

    const pageText = document.createElement('div');
    pageText.className = 'login__text';
    const textPage = document.createElement('p');
    textPage.className = 'text_bold';
    textPage.innerText = 'Create an account';
    pageText.append(textPage);
    login.append(pageText);

    const loginEmailContainer = document.createElement('div');
    loginEmailContainer.className = 'input';
    login.append(loginEmailContainer);

    const inputLogin = this.renderLogin(
      'input__email',
      'email',
      'username',
      'Email',
    );
    loginEmailContainer.append(inputLogin);

    const paswordInputContainer = document.createElement('div');
    paswordInputContainer.className = 'input';
    login.append(paswordInputContainer);

    const inputPass = this.renderLogin(
      'input__password',
      'password',
      'password',
      'Password',
    );
    paswordInputContainer.append(inputPass);
    showPasword(inputPass);

    const inputNameContainer = document.createElement('div');
    inputNameContainer.className = 'input';
    login.append(inputNameContainer);

    const inputName = this.renderLogin('input__name', 'text', 'name', 'Name');
    inputNameContainer.append(inputName);

    const surnameInputContainer = document.createElement('div');
    surnameInputContainer.className = 'input';
    login.append(surnameInputContainer);

    const inputSurname = this.renderLogin(
      'input__name',
      'text',
      'surname',
      'Surname',
    );
    surnameInputContainer.append(inputSurname);

    const inputDateOfBirthContainer = document.createElement('div');
    inputDateOfBirthContainer.className = 'input';
    login.append(inputDateOfBirthContainer);

    const inputDateOfBirthLabel = document.createElement('p');
    inputDateOfBirthLabel.className = 'input__text_date';
    inputDateOfBirthLabel.innerText = 'Date of birth:';
    inputDateOfBirthContainer.append(inputDateOfBirthLabel);

    const inputDateOfBirth = this.renderLogin(
      'input__info',
      'date',
      'date',
      '01.01.1970',
    );
    inputDateOfBirthContainer.append(inputDateOfBirth);

    const shippingAdressWrapper = document.createElement('div');
    shippingAdressWrapper.className = 'shipping-adress_wrapper';
    login.append(shippingAdressWrapper);

    const shipingAdressTitle = document.createElement('p');
    shipingAdressTitle.className = 'text_bold';
    shipingAdressTitle.innerText = 'Shipping address';
    shippingAdressWrapper.append(shipingAdressTitle);

    const inputShipingStreetContainer = document.createElement('div');
    inputShipingStreetContainer.className = 'input';
    inputShipingStreetContainer.classList.add('input__adress_wrapper');
    shippingAdressWrapper.append(inputShipingStreetContainer);

    const inputShipingStreet = this.renderLogin(
      'input__adress',
      'text',
      'shipping-street',
      'Street',
    );
    inputShipingStreetContainer.append(inputShipingStreet);

    const inputCityShippingContainer = document.createElement('div');
    inputCityShippingContainer.className = 'input';
    inputCityShippingContainer.classList.add('input__adress_wrapper');
    shippingAdressWrapper.append(inputCityShippingContainer);

    const inputShippingCity = this.renderLogin(
      'input__adress',
      'text',
      'shipping-city',
      'City',
    );
    inputCityShippingContainer.append(inputShippingCity);

    const inputShippingCodeContainer = document.createElement('div');
    inputShippingCodeContainer.className = 'input';
    shippingAdressWrapper.append(inputShippingCodeContainer);

    const inputShipingCode = this.renderLogin(
      'input__adress',
      'text',
      'shipping-code',
      'Postal code',
    );
    inputShippingCodeContainer.append(inputShipingCode);

    const inputCountryShippingContainer = document.createElement('div');
    inputCountryShippingContainer.className = 'input';
    shippingAdressWrapper.append(inputCountryShippingContainer);

    const inputShippingCountry = document.createElement('input');
    inputShippingCountry.className = 'input__adress';
    inputShippingCountry.setAttribute('list', 'country');
    inputShippingCountry.id = 'shipping-country';
    inputShippingCountry.placeholder = 'Country';

    inputCountryShippingContainer.append(inputShippingCountry);

    const inputCountryShip: HTMLDataListElement =
      document.createElement('datalist');
    inputCountryShip.id = 'country';

    this.createCountry('DE', inputCountryShip, 'Germany');
    this.createCountry('PL', inputCountryShip, 'Poland');
    this.createCountry('BY', inputCountryShip, 'Belarus');
    this.createCountry('AT', inputCountryShip, 'Austria');
    this.createCountry('CA', inputCountryShip, 'Canada');

    inputCountryShippingContainer.append(inputCountryShip);

    const labelDefaultShipingAddress = this.createDefaultAdress(
      'default-shipping-adress',
      shippingAdressWrapper,
    );

    let sameAdressWrapper = document.createElement('div');
    sameAdressWrapper.className = 'same-adress_wrapper';

    let sameAdress = document.createElement('input');
    sameAdress.className = 'same';
    sameAdress.type = 'checkbox';
    sameAdress.name = 'same-adress';
    sameAdress.value = 'value';
    sameAdress.id = 'same-adress';

    const labelOnlyAdres = document.createElement('label');
    labelOnlyAdres.htmlFor = 'same-adress';
    labelOnlyAdres.className = 'label__adress';
    labelOnlyAdres.appendChild(
      document.createTextNode('Use the same address for billing and shipping'),
    );

    sameAdressWrapper.appendChild(sameAdress);
    sameAdressWrapper.appendChild(labelOnlyAdres);

    login.appendChild(sameAdressWrapper);

    let billingAdressWrapper = document.createElement('div');
    billingAdressWrapper.className = 'billing-adress_wrapper';

    login.append(billingAdressWrapper);

    const billingAdressTitle = document.createElement('p');
    billingAdressTitle.className = 'text_bold';
    billingAdressTitle.innerText = 'Billing address';
    billingAdressWrapper.append(billingAdressTitle);

    const inputBillingStreetContainer = document.createElement('div');
    inputBillingStreetContainer.className = 'input';
    inputBillingStreetContainer.classList.add('input__adress_wrapper');
    billingAdressWrapper.append(inputBillingStreetContainer);

    const inputBillingStreet = this.renderLogin(
      'input__adress',
      'text',
      'billing-street',
      'Street',
    );
    inputBillingStreetContainer.append(inputBillingStreet);

    const inputBillingCityContainer = document.createElement('div');
    inputBillingCityContainer.className = 'input';
    billingAdressWrapper.append(inputBillingCityContainer);

    const inputBillingCity = this.renderLogin(
      'input__adress',
      'text',
      'billing-city',
      'City',
    );
    inputBillingCityContainer.append(inputBillingCity);

    const inputBillingZipContainer = document.createElement('div');
    inputBillingZipContainer.className = 'input';
    billingAdressWrapper.append(inputBillingZipContainer);

    const inputBillingCode = this.renderLogin(
      'input__adress',
      'text',
      'billing-code',
      'Postal code',
    );
    inputBillingZipContainer.append(inputBillingCode);

    const inputBillingCountryContainer = document.createElement('div');
    inputBillingCountryContainer.className = 'input';
    billingAdressWrapper.append(inputBillingCountryContainer);

    const inputBillingCountry = document.createElement('input');
    inputBillingCountry.className = 'input__adress';
    inputBillingCountry.setAttribute('list', 'country');
    inputBillingCountry.id = 'billing-country';
    inputBillingCountry.placeholder = 'Country';

    inputBillingCountryContainer.append(inputBillingCountry);

    const inputCountryBil: HTMLDataListElement =
      document.createElement('datalist');
    inputCountryBil.id = 'country';

    this.createCountry('BY', inputCountryBil, 'Belarus');
    this.createCountry('DE', inputCountryBil, 'Germany');
    this.createCountry('PL', inputCountryBil, 'Poland');
    this.createCountry('AT', inputCountryBil, 'Austria');
    this.createCountry('CA', inputCountryBil, 'Canada');

    inputBillingCountryContainer.append(inputCountryBil);

    billingAdressWrapper.append(inputBillingCountryContainer);

    const labelDefaultBillingAddress = this.createDefaultAdress(
      'default-billing-adress',
      billingAdressWrapper,
    );

    const loginSubmitWrapper = document.createElement('div');
    loginSubmitWrapper.className = 'login__submit_wrapper';
    login.append(loginSubmitWrapper);
    const registrSubmit = document.createElement('button');
    registrSubmit.className = 'login__submit';
    registrSubmit.type = 'button';
    registrSubmit.id = 'login-submit';
    registrSubmit.disabled = true;
    registrSubmit.textContent = 'Sign up';
    this.submitRegistrForm(
      inputLogin,
      inputPass,
      inputName,
      inputSurname,
      inputDateOfBirth,
      inputShippingCountry,
      inputShipingStreet,
      inputShipingCode,
      inputShippingCity,
      inputBillingCountry,
      inputBillingStreet,
      inputBillingCode,
      inputBillingCity,
      registrSubmit,
      labelOnlyAdres,
      billingAdressWrapper,
      labelDefaultShipingAddress,
      labelDefaultBillingAddress,
    );

    loginSubmitWrapper.append(registrSubmit);

    this.container.append(cont);

    return this.container;
  }
}

export default RegistrationPage;
