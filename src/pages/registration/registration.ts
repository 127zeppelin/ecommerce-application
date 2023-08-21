import Page from "../../temlates/page";

class RegistrationPage extends Page {
  TextObject = {
    MainTitle: "Registration Page",
  };

  // constructor(id: string) {
  //   super(id);
  // }

  private renderLogin(className: string, type: string, id: string, placeholder: string) {
    let input = document.createElement("input");
    input.className = className;
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
  }

  render() {
    const cont = document.createElement("div");
    cont.className = "container";
    const loginWrapper = document.createElement("div");
    loginWrapper.className = "login__wrapper";
    const login = document.createElement("form");
    login.className = "login";
    loginWrapper.append(login);

    const loginEmail = document.createElement("div");
    loginEmail.className = "input";
    login.append(loginEmail);

    let input = this.renderLogin("input__email", "email", "username", "Email");
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

    // let input = this.renderLogin("input__name", "text", "surname", "Surname");
    // loginName.append(input);

    const loginInfo = document.createElement("div");
    loginInfo.className = "input";
    login.append(loginInfo);

    input = this.renderLogin("input__info", "date", "date", "01.01.1970");
    loginInfo.append(input);

    input = this.renderLogin("input__info", "radio", "gender", "male");
    input.name = "gender";
    input.value = "male";
    loginInfo.append(input);

    let text = document.createElement("span");
    text.innerText = "Male";
    loginInfo.append(text);

    input = this.renderLogin("input__info", "radio", "gender", "male");
    input.name = "gender";
    input.value = "male";
    loginInfo.append(input);

    text = text = document.createElement("span");
    text.innerText = "Female";
    loginInfo.append(text);


    const loginShippingAdress = document.createElement("div");
    loginShippingAdress.className = "input";
    login.append(loginShippingAdress);

    text = document.createElement("p");
    text.innerText = "Shipping adress";
    loginShippingAdress.append(text);

    input = this.renderLogin("input__adress", "text", "shipping-street", "Street");
    loginShippingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "shipping-city", "City");
    loginShippingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "shipping-code", "Postal code");
    loginShippingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "shipping-country", "Counrtry");
    loginShippingAdress.append(input);

    const loginBillingAdress = document.createElement("div");
    loginBillingAdress.className = "input";
    login.append(loginBillingAdress);

    text = document.createElement("p");
    text.innerText = "Billing adress";
    loginBillingAdress.append(text);


    input = this.renderLogin("input__adress", "text", "billing-street", "Street");
    loginBillingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "billing-city", "City");
    loginBillingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "billing-code", "Postal code");
    loginBillingAdress.append(input);

    input = this.renderLogin("input__adress", "text", "billing-country", "Counrtry");
    loginBillingAdress.append(input);

    const loginBtn = document.createElement("button");
    loginBtn.className = "login__btn";
    loginBtn.type = "submit";
    loginBtn.id = "login-submit";
    loginBtn.textContent = "Sign up";

    login.append(loginBtn);

    this.container.append(cont);

    return this.container;
  }
}

export default RegistrationPage;
