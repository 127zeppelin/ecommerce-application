import Page from "../../temlates/page";
import { customerLogin } from "./customerlogin";
import { tokenStore } from "../../components/app-components/api";

class LoginPage extends Page {
  TextObject = {
    MainTitle: "Login Page",
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

  submitLoginForm(inputLogin: HTMLInputElement, inputPass: HTMLInputElement, loginSubmit: HTMLElement) {

    // const resolveMessage: HTMLElement | null = document.querySelector('.resolve');


    loginSubmit.addEventListener('click', async (event) => {
      event.preventDefault(); // Предотвращаем действие по умолчанию (например, отправку формы)

      const inputLoginvalue: string = inputLogin.value;
      const inputPassvalue: string = inputPass.value;

      try {
        await customerLogin(inputLoginvalue, inputPassvalue);
        localStorage.setItem('access_token', tokenStore.token);
        localStorage.setItem('expiration_time', String(tokenStore.expirationTime));
        localStorage.setItem('refresh_token', tokenStore.refreshToken ? tokenStore.refreshToken : '');
        window.location.href = './#main'
      } catch (error: any) {
        //console.error('Error fetching project details:', error.message);

        // if (resolveMessage instanceof HTMLElement) {
        //   resolveMessage.innerText = error.message;
        // }
      }
    })
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
    pageButton.classList.add("login__btn_active");
    pageButton = this.createPageButtons("#registration", "Sign up");
    pageButtons.append(pageButton);
    login.append(pageButtons);

    const pageText = document.createElement("div");
    pageText.className = "login__text";
    let text = document.createElement("p");
    text.className = "text_bold";
    text.innerText = "Welcome back";
    pageText.append(text);
    text = document.createElement("p");
    text.innerText = "We're so exited to see you again!";
    pageText.append(text);
    login.append(pageText);

    const loginEmail = document.createElement("div");
    loginEmail.className = "input";
    login.append(loginEmail);

    const inputLogin = this.renderLogin("input__email", "email", "username", "Email");
    loginEmail.append(inputLogin);

    const loginPassword = document.createElement("div");
    loginPassword.className = "input";
    login.append(loginPassword);

    const inputPassword = this.renderLogin("input__password", "text", "password", "Password");
    loginPassword.append(inputPassword);

    cont.append(loginWrapper);

    const loginSubmitWrapper = document.createElement("div");
    loginSubmitWrapper.className = "login__submit_wrapper";
    login.append(loginSubmitWrapper);
    const loginSubmit = document.createElement("button");
    loginSubmit.className = "login__submit";
    loginSubmit.type = "submit";
    loginSubmit.id = "login-submit";
    loginSubmit.textContent = "Log in";

    loginSubmitWrapper.append(loginSubmit);

    this.container.append(cont);
    this.submitLoginForm(inputLogin, inputPassword, loginSubmit)
    return this.container;
  }
}

export default LoginPage;
