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

    // let input = this.renderLogin("input__name", "text", "surname", "Surname");
    // loginName.append(input);

    const loginInfo = document.createElement("div");
    loginInfo.className = "input";
    login.append(loginInfo);

    input = this.renderLogin("input__info", "date", "date", "01.01.1970");
    loginInfo.append(input);

    const loginShippingAdress = document.createElement("div");
    loginShippingAdress.className = "input";
    login.append(loginShippingAdress);

    let text = document.createElement("p");
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

    return this.container;
  }
}

export default RegistrationPage;
