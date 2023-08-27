import Page from "../../temlates/page";
import { customerLogin } from "./customerlogin";
import { tokenStore } from "../../components/api";
import { handleEmailInputChange, handlePasswordInputChange } from "../../components/validationinput";
import { showPasword } from "../../components/showpasword";

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

  submitLoginForm(inputLogin: HTMLInputElement, inputPass: HTMLInputElement, loginSubmit: HTMLButtonElement) {
    const invalidInputMessageEmail: HTMLDivElement = document.createElement('div');
    invalidInputMessageEmail.classList.add('validation-message');
    inputLogin.insertAdjacentElement('afterend', invalidInputMessageEmail);
    let resultEmail = false;

    const invalidInputMessagePass: HTMLDivElement = document.createElement('div');
    invalidInputMessagePass.classList.add('validation-message');
    inputPass.insertAdjacentElement('afterend', invalidInputMessagePass);
    let resultPassword = false;
    const checkResultValidation = (email: boolean, password: boolean) => {
      if (email && password) { loginSubmit.disabled = false; }
    }

    inputLogin.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement = event.target as HTMLInputElement;
      resultEmail = handleEmailInputChange(inputTargetElement, invalidInputMessageEmail);
      checkResultValidation(resultEmail, resultPassword);
    });

    inputPass.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement = event.target as HTMLInputElement;
      resultPassword = handlePasswordInputChange(inputTargetElement, invalidInputMessagePass);
      checkResultValidation(resultEmail, resultPassword);
    });

    loginSubmit.addEventListener('click', async (event) => {
      event.preventDefault();
      const inputLoginvalue: string = inputLogin.value;
      const inputPassvalue: string = inputPass.value;

      try {
        await customerLogin(inputLoginvalue, inputPassvalue);
        localStorage.setItem('access_token', tokenStore.token);
        localStorage.setItem('expiration_time', String(tokenStore.expirationTime));
        localStorage.setItem('refresh_token', tokenStore.refreshToken ? tokenStore.refreshToken : '');
        const BODY: HTMLElement | null = document.querySelector('body');
        const resolveMessage: HTMLElement = document.createElement('div');
        resolveMessage.classList.add('resolve', 'successfully');
        if (resolveMessage instanceof HTMLElement && BODY instanceof HTMLElement) {
          resolveMessage.innerText = 'Logged in successfully';
          BODY.append(resolveMessage);
          setTimeout(() => {
            resolveMessage.remove();
          }, 4000);
          window.location.href = './#main'
        }
      } catch (error: any) {
        const BODY: HTMLElement | null = document.querySelector('body');
        const resolveMessage: HTMLElement = document.createElement('div');
        resolveMessage.classList.add('resolve');
        if (resolveMessage instanceof HTMLElement && BODY instanceof HTMLElement) {
          resolveMessage.innerText = error.message;
          BODY.append(resolveMessage);
          setTimeout(() => {
            resolveMessage.remove();
          }, 4000);
        }
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

    const inputPassword = this.renderLogin("input__password", "password", "password", "Password");
    loginPassword.append(inputPassword);
    showPasword(inputPassword);

    cont.append(loginWrapper);

    const loginSubmitWrapper = document.createElement("div");
    loginSubmitWrapper.className = "login__submit_wrapper";
    login.append(loginSubmitWrapper);
    const loginSubmit = document.createElement("button");
    loginSubmit.className = "login__submit";
    loginSubmit.type = "submit";
    loginSubmit.id = "login-submit";
    loginSubmit.disabled = true;
    loginSubmit.textContent = "Log in";

    loginSubmitWrapper.append(loginSubmit);

    this.container.append(cont);
    this.submitLoginForm(inputLogin, inputPassword, loginSubmit)
    return this.container;
  }
}

export default LoginPage;
