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

    const loginEmail = document.createElement("div");
    loginEmail.className = "input";
    login.append(loginEmail);

    let input = this.renderLogin("input__email", "email", "username", "Email");
    loginEmail.append(input);
    cont.append(loginWrapper);

    const loginPassword = document.createElement("div");
    loginPassword.className = "input";
    login.append(loginPassword);

    input = this.renderLogin("input__password", "text", "password", "Password");
    loginPassword.append(input);

    const loginName = document.createElement("div");
    loginName.className = "input";
    login.append(loginName);

    input = this.renderLogin("input__name", "text", "name", "Name");
    loginName.append(input);

    input = this.renderLogin("input__name", "text", "surname", "Surname");
    loginName.append(input);

    const loginInfo = document.createElement("div");
    loginInfo.className = "input";
    login.append(loginInfo);

    let text = document.createElement("p");
    text.className = "input__text_date";
    text.innerText = "Date of birth:";
    loginInfo.append(text);

    input = this.renderLogin("input__info", "date", "date", "01.01.1970");
    loginInfo.append(input);

    let shippingAdressWrapper = document.createElement("div");
    shippingAdressWrapper.className = "shipping-adress_wrapper";
    login.append(shippingAdressWrapper);

    text = document.createElement("p");
    text.className = "text_bold";
    text.innerText = "Shipping address";
    shippingAdressWrapper.append(text);

    const loginShippingAdress = document.createElement("div");
    loginShippingAdress.className = "input";
    loginShippingAdress.classList.add("input__adress_wrapper");
    shippingAdressWrapper.append(loginShippingAdress);


    input = this.renderLogin("input__adress", "text", "shipping-street", "Street");
    loginShippingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "shipping-city", "City");
    loginShippingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "shipping-code", "Postal code");
    loginShippingAdress.append(input);

    input = document.createElement("input");
    input.className = "input__adress";
    input.setAttribute("list","country");
    input.id = "shipping-country";
    input.placeholder = "Country";

    loginShippingAdress.append(input);

    let inputCountry = document.createElement("datalist");
    inputCountry.id = "country";

    this.createCity("Belarus", inputCountry);
    this.createCity("Germany", inputCountry);
    this.createCity("Poland", inputCountry);
    this.createCity("Austria", inputCountry);
    this.createCity("Canada", inputCountry);

    loginShippingAdress.append(inputCountry);

    this.createDefaultAdress("default-shipping-adress", shippingAdressWrapper);


    let sameAdressWrapper = document.createElement('div');
    sameAdressWrapper.className = "same-adress_wrapper";

    let sameAdress = document.createElement("input");
    sameAdress.className = "same";
    sameAdress.type = "checkbox";
    sameAdress.name = "same-adress";
    sameAdress.value = "value";
    sameAdress.id = "same-adress";

    var label = document.createElement("label")
    label.htmlFor = "same-adress";
    label.className = "label__adress";
    label.appendChild(document.createTextNode("Use the same address for billing and shipping"));

    sameAdressWrapper.appendChild(sameAdress);
    sameAdressWrapper.appendChild(label);

    login.appendChild(sameAdressWrapper);


    let billingAdressWrapper = document.createElement("div");
    billingAdressWrapper.className = "billing-adress_wrapper";
    
    login.append(billingAdressWrapper);

    text = document.createElement("p");
    text.className = "text_bold";
    text.innerText = "Billing address";
    billingAdressWrapper.append(text);

    const loginBillingAdress = document.createElement("div");
    loginBillingAdress.className = "input";
    loginBillingAdress.classList.add("input__adress_wrapper");
    login.append(loginBillingAdress);

    input = this.renderLogin("input__adress", "text", "billing-street", "Street");
    loginBillingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "billing-city", "City");
    loginBillingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "billing-code", "Postal code");
    loginBillingAdress.append(input);

    input = document.createElement("input");
    input.className = "input__adress";
    input.setAttribute("list","country");
    input.id = "billing-country";
    input.placeholder = "Country";

    loginBillingAdress.append(input);

    inputCountry = document.createElement("datalist");
    inputCountry.id = "country";

    this.createCity("Belarus", inputCountry);
    this.createCity("Germany", inputCountry);
    this.createCity("Poland", inputCountry);
    this.createCity("Austria", inputCountry);
    this.createCity("Canada", inputCountry);

    loginBillingAdress.append(inputCountry);
    
    billingAdressWrapper.append(loginBillingAdress);

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
