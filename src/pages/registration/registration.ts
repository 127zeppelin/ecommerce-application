import Page from "../../temlates/page";

class RegistrationPage extends Page {
  TextObject = {
    MainTitle: "Registration Page",
  };

  // constructor(id: string) {
  //   super(id);
  // }
  private createPageButtons(href: string, text: string) {
    const pageButton = document.createElement("div");
    const loginBtn = document.createElement("a");
    pageButton.className = "login__btn";
    loginBtn.href = href;
    loginBtn.innerText = text;
    pageButton.append(loginBtn);
    return pageButton;
  }

  private renderLogin(className: string, type: string, id: string, placeholder: string) {
    const input = document.createElement("input");
    input.className = className;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
  }

  private createCity(value: string, inputCity: HTMLDataListElement) {
    let city = document.createElement("option");
    city.value = value;
    inputCity.append(city);
  }

  private createDefaultAdress(id: string, AdressWrapper: HTMLElement) {
    let defaultAdressWrapper = document.createElement('div');
    defaultAdressWrapper.className = "default-adress_wrapper";

    let defaultAdress = document.createElement("input");
    defaultAdress.type = "checkbox";
    defaultAdress.name = "default-adress";
    defaultAdress.value = "value";
    defaultAdress.id = id;

    var label = document.createElement("label")
    label.htmlFor = id;
    label.className = "label__adress";
    label.appendChild(document.createTextNode("Set as a default address"));

    defaultAdressWrapper.appendChild(defaultAdress);
    defaultAdressWrapper.appendChild(label);

    AdressWrapper.appendChild(defaultAdressWrapper);
  }

  private checkSameAdress() {
    // let check = document.querySelector(".same")!;
    // let same = document.querySelector(".billing-adress_wrapper")!;

    // check.addEventListener("click", () => {
    //     same.classList.toggle("billing-adress_inactive");
    // })
  }

  render() {
    const cont = document.createElement("div");
    cont.className = "container";
    const loginWrapper = document.createElement("div");
    loginWrapper.className = "login__wrapper";
    const login = document.createElement("form");
    login.className = "login";
    loginWrapper.append(login);
    cont.append(loginWrapper);

    const pageButtons = document.createElement("div");
    pageButtons.className = "login__btns";
    let pageButton = this.createPageButtons("#login", "Log in");
    pageButtons.append(pageButton);
    pageButton = this.createPageButtons("#registration", "Sign up");
    pageButtons.append(pageButton);
    pageButton.classList.add("login__btn_active");
    login.append(pageButtons);

    const pageText = document.createElement("div");
    pageText.className = "login__text";
    const textPage = document.createElement("p");
    textPage.className = "text_bold";
    textPage.innerText = "Create an account";
    pageText.append(textPage);
    login.append(pageText);

    const loginEmailContainer = document.createElement("div");
    loginEmailContainer.className = "input";
    login.append(loginEmailContainer);

    let input = this.renderLogin("input__email", "email", "username", "Email");
    loginEmailContainer.append(input);
    

    const paswordInputContainer = document.createElement("div");
    paswordInputContainer.className = "input";
    login.append(paswordInputContainer);

    input = this.renderLogin("input__password", "text", "password", "Password");
    paswordInputContainer.append(input);

    const inputNameContainer = document.createElement("div");
    inputNameContainer.className = "input";
    login.append(inputNameContainer);

    input = this.renderLogin("input__name", "text", "name", "Name");
    inputNameContainer.append(input);

    const surnameInputContainer = document.createElement("div");
    surnameInputContainer.className = "input";
    login.append(surnameInputContainer);

    input = this.renderLogin("input__name", "text", "surname", "Surname");
    surnameInputContainer.append(input);

    const inputDateOfBirthContainer = document.createElement("div");
    inputDateOfBirthContainer.className = "input";
    login.append(inputDateOfBirthContainer);

    const inputDateOfBirthLabel = document.createElement("p");
    inputDateOfBirthLabel.className = "input__text_date";
    inputDateOfBirthLabel.innerText = "Date of birth:";
    inputDateOfBirthContainer.append(inputDateOfBirthLabel);

    input = this.renderLogin("input__info", "date", "date", "01.01.1970");
    inputDateOfBirthContainer.append(input);

    const shippingAdressWrapper = document.createElement("div");
    shippingAdressWrapper.className = "shipping-adress_wrapper";
    login.append(shippingAdressWrapper);

    const shipingAdressTitle = document.createElement("p");
    shipingAdressTitle.className = "text_bold";
    shipingAdressTitle.innerText = "Shipping address";
    shippingAdressWrapper.append(shipingAdressTitle);

    const inputShipingStreetContainer = document.createElement("div");
    inputShipingStreetContainer.className = "input";
    inputShipingStreetContainer.classList.add("input__adress_wrapper");
    shippingAdressWrapper.append(inputShipingStreetContainer);


    input = this.renderLogin("input__adress", "text", "shipping-street", "Street");
    inputShipingStreetContainer.append(input);


    const inputCityShippingContainer = document.createElement("div");
    inputCityShippingContainer.className = "input";
    inputCityShippingContainer.classList.add("input__adress_wrapper");
    shippingAdressWrapper.append(inputCityShippingContainer);

    input = this.renderLogin("input__adress", "text", "shipping-city", "City");
    inputCityShippingContainer.append(input);

    const inputZipShippingContainer = document.createElement("div");
    inputZipShippingContainer.className = "input";
    shippingAdressWrapper.append(inputZipShippingContainer);

    input = this.renderLogin("input__adress", "text", "shipping-code", "Postal code");
    inputZipShippingContainer.append(input);

    const inputCountryShippingContainer = document.createElement("div");
    inputCountryShippingContainer.className = "input";
    shippingAdressWrapper.append(inputCountryShippingContainer);

    input = document.createElement("input");
    input.className = "input__adress";
    input.setAttribute("list","country");
    input.id = "shipping-country";
    input.placeholder = "Country";

    inputCountryShippingContainer.append(input);

    let inputCountry = document.createElement("datalist");
    inputCountry.id = "country";

    this.createCity("Belarus", inputCountry);
    this.createCity("Germany", inputCountry);
    this.createCity("Poland", inputCountry);
    this.createCity("Austria", inputCountry);
    this.createCity("Canada", inputCountry);

    inputCountryShippingContainer.append(inputCountry);

    this.createDefaultAdress("default-shipping-adress", shippingAdressWrapper);


    let sameAdressWrapper = document.createElement('div');
    sameAdressWrapper.className = "same-adress_wrapper";

    let sameAdress = document.createElement("input");
    sameAdress.className = "same";
    sameAdress.type = "checkbox";
    sameAdress.name = "same-adress";
    sameAdress.value = "value";
    sameAdress.id = "same-adress";

    const label = document.createElement("label")
    label.htmlFor = "same-adress";
    label.className = "label__adress";
    label.appendChild(document.createTextNode("Use the same address for billing and shipping"));
    

    sameAdressWrapper.appendChild(sameAdress);
    sameAdressWrapper.appendChild(label);

    login.appendChild(sameAdressWrapper);


    let billingAdressWrapper = document.createElement("div");
    billingAdressWrapper.className = "billing-adress_wrapper";

    
    let onlyOneAdress: boolean = false;
    label.addEventListener('click', function() {
      billingAdressWrapper.classList.toggle('hidden');
      if(!onlyOneAdress){
        onlyOneAdress = true;
      }else{onlyOneAdress = false;}
    });
    
    login.append(billingAdressWrapper);



    const billingAdressTitle = document.createElement("p");
    billingAdressTitle.className = "text_bold";
    billingAdressTitle.innerText = "Billing address";
    billingAdressWrapper.append(billingAdressTitle);

    const inputBillingStreetContainer = document.createElement("div");
    inputBillingStreetContainer.className = "input";
    inputBillingStreetContainer.classList.add("input__adress_wrapper");
    billingAdressWrapper.append(inputBillingStreetContainer);

    input = this.renderLogin("input__adress", "text", "billing-street", "Street");
    inputBillingStreetContainer.append(input);

    const inputBillingCityContainer = document.createElement("div");
    inputBillingCityContainer.className = "input";
    billingAdressWrapper.append(inputBillingCityContainer);

    input = this.renderLogin("input__adress", "text", "billing-city", "City");
    inputBillingCityContainer.append(input);

    const inputBillingZipContainer = document.createElement("div");
    inputBillingZipContainer.className = "input";
    billingAdressWrapper.append(inputBillingZipContainer);

    input = this.renderLogin("input__adress", "text", "billing-code", "Postal code");
    inputBillingZipContainer.append(input);

    const inputBillingCountryContainer = document.createElement("div");
    inputBillingCountryContainer.className = "input";
    billingAdressWrapper.append(inputBillingCountryContainer);

    input = document.createElement("input");
    input.className = "input__adress";
    input.setAttribute("list","country");
    input.id = "billing-country";
    input.placeholder = "Country";

    inputBillingCountryContainer.append(input);

    inputCountry = document.createElement("datalist");
    inputCountry.id = "country";

    this.createCity("Belarus", inputCountry);
    this.createCity("Germany", inputCountry);
    this.createCity("Poland", inputCountry);
    this.createCity("Austria", inputCountry);
    this.createCity("Canada", inputCountry);

    inputBillingCountryContainer.append(inputCountry);
    
    billingAdressWrapper.append(inputBillingCountryContainer);

    this.createDefaultAdress("default-billing-adress", billingAdressWrapper);


    const loginSubmitWrapper = document.createElement("div");
    loginSubmitWrapper.className = "login__submit_wrapper";
    login.append(loginSubmitWrapper);
    const loginSubmit = document.createElement("button");
    loginSubmit.className = "login__submit";
    loginSubmit.type = "submit";
    loginSubmit.id = "login-submit";
    loginSubmit.textContent = "Sign up";

    loginSubmitWrapper.append(loginSubmit);

    this.container.append(cont);

    this.checkSameAdress();

    return this.container;
  }
}

export default RegistrationPage;
