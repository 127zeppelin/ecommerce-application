import Page from "../../temlates/page";

class LoginPage extends Page  {
  TextObject = {
    MainTitle: "Login Page",
  };

  // constructor(id: string) {
  //   super(id);
  // }

  private createPageButtons(href: string, text: string) {
    let pageButton = document.createElement("div");
    let loginBtn = document.createElement("a");
    pageButton.className = "login__btn";
    loginBtn.href = href;
    loginBtn.innerText = text;
    pageButton.append(loginBtn);
    return pageButton;
  }

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

    const pageButtons = document.createElement("div");
    pageButtons.className = "login__btns";
    let pageButton = this.createPageButtons("#login", "Log in");
    pageButtons.append(pageButton);
    pageButton.classList.add("login__btn_active");
    pageButton = this.createPageButtons("#registration", "Sign up");
    pageButtons.append(pageButton);
    login.append(pageButtons);

    const loginEmail = document.createElement("div");
    loginEmail.className = "input";
    login.append(loginEmail);

    let input = this.renderLogin("input__email", "email", "username", "Email");
    loginEmail.append(input);
    
    const loginPassword = document.createElement("div");
    loginPassword.className = "input";
    login.append(loginPassword);
    
    input = this.renderLogin("input__password", "text", "password", "Password");
    loginPassword.append(input);
    
    cont.append(loginWrapper);

    let loginSubmit = document.createElement("button");
    loginSubmit.className = "login__submit";
    loginSubmit.type = "submit";
    loginSubmit.id = "login-submit";
    loginSubmit.textContent = "Log in";

    login.append(loginSubmit);

    this.container.append(cont);

    return this.container;
  }
}

export default LoginPage;
