import Page from '../../temlates/page'
import { customerLogin } from './customerLogin'
import { tokenStore } from '../../components/api'
import {
  handleEmailInputChange,
  handlePasswordInputChange
} from '../../utils/validationInput'
import { addShowHidePaswordBtn } from '../../utils/showHidePasword' 
import { CSS_CLASSES } from '../../constants/cssClases'
import { createEl } from '../../utils/createElement'
import { isTheUserLoggedIn } from './isTheUserLogged'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

class LoginPage extends Page {
  TextObject = {
    MainTitle: 'Login Page',
  }

  private createPageButtons(href: string, text: string) {
    const btnLoginOrRegistr = createEl('div', [CSS_CLASSES.pageBtn]);
    const btnLoginOrRegistrLink = createEl('a', undefined, text, [href]);
    btnLoginOrRegistr.append(btnLoginOrRegistrLink)
    return btnLoginOrRegistr
  }

  redirectIfCustomerWithLogin() {
    const userHaveLogin = isTheUserLoggedIn()
    if (userHaveLogin) {
      window.location.hash = '#user'
    }
  }

  private renderLogin(
    className: string,
    type: string,
    id: string,
    placeholder: string
  ) {
    const input = createEl('input', [className]);
    input.type = type
    input.id = id
    input.placeholder = placeholder
    return input
  }

  submitLoginForm(
    inputLogin: HTMLInputElement,
    inputPass: HTMLInputElement,
    loginSubmit: HTMLButtonElement
  ) {
    const invalidInputMessageEmail = createEl('div', [CSS_CLASSES.validationMsg])
    inputLogin.insertAdjacentElement('afterend', invalidInputMessageEmail)
    let resultEmail = false

    const invalidInputMessagePass = createEl('div', [CSS_CLASSES.validationMsg])
    inputPass.insertAdjacentElement('afterend', invalidInputMessagePass)
    let resultPassword = false
    const checkResultValidation = (email: boolean, password: boolean) => {
      if (email && password) {
        loginSubmit.disabled = false
      }
    }

    inputLogin.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement
      resultEmail = handleEmailInputChange(
        inputTargetElement,
        invalidInputMessageEmail
      )
      checkResultValidation(resultEmail, resultPassword)
    })

    inputPass.addEventListener('input', (event) => {
      const inputTargetElement: HTMLInputElement =
        event.target as HTMLInputElement
      resultPassword = handlePasswordInputChange(
        inputTargetElement,
        invalidInputMessagePass
      )
      checkResultValidation(resultEmail, resultPassword)
    })

    loginSubmit.addEventListener('click', async (event) => {
      event.preventDefault()
      const inputLoginvalue: string = inputLogin.value
      const inputPassvalue: string = inputPass.value

      try {
        await customerLogin(inputLoginvalue, inputPassvalue)
        localStorage.setItem('access_token', tokenStore.token)
        localStorage.setItem(
          'expiration_time',
          String(tokenStore.expirationTime)
        )
        localStorage.setItem(
          'refresh_token',
          tokenStore.refreshToken ? tokenStore.refreshToken : ''
        )
        const resolveMessage: string = `Logged in successfully`
        resolveMessageAddAndRemove(resolveMessage, true)
        window.location.href = './#main'

      } catch (error: any) {
        const resolveMessage: string = `${error.message}`
        resolveMessageAddAndRemove(resolveMessage, false)
      }
    })
  }

  render() {
    this.redirectIfCustomerWithLogin()
    const cont = createEl('div', [CSS_CLASSES.cont])
    const loginWrapper = createEl('div', [CSS_CLASSES.formWrap])
    const loginForm = createEl('form', [CSS_CLASSES.loginForm])
    loginWrapper.append(loginForm)

    const pageButtons = createEl('div', [CSS_CLASSES.pageBtns])
    let pageButton = this.createPageButtons('#login', 'Log in')
    pageButtons.append(pageButton)
    pageButton.classList.add('login__btn_active')
    pageButton = this.createPageButtons('#registration', 'Sign up')
    pageButtons.append(pageButton)
    loginForm.append(pageButtons)

    const pageText = createEl('div', [CSS_CLASSES.registrationPageText]);
    const textLineOne = createEl('p', [CSS_CLASSES.registrationPageTextParagraph], 'Welcome back');
    pageText.append(textLineOne)
    const textLineTwo = createEl('p', [CSS_CLASSES.textParagraph], "We're so exited to see you again!")
    pageText.append(textLineTwo)
    loginForm.append(pageText)

    const loginEmail = createEl('div', [CSS_CLASSES.inputContainer])
    loginForm.append(loginEmail)

    const inputLogin = this.renderLogin(
      'input__email',
      'email',
      'username',
      'Email'
    )
    loginEmail.append(inputLogin)

    const loginPassword = createEl('div', [CSS_CLASSES.inputContainer])
    loginForm.append(loginPassword)

    const inputPassword = this.renderLogin(
      'input__password',
      'password',
      'password',
      'Password'
    )
    loginPassword.append(inputPassword)
    addShowHidePaswordBtn(inputPassword)

    cont.append(loginWrapper)

    const loginSubmitWrapper = createEl('div', [CSS_CLASSES.submitFormWrapper])
    loginForm.append(loginSubmitWrapper);
    const loginSubmit = createEl('button', [CSS_CLASSES.submitBtn], 'Log in');
    loginSubmit.type = 'submit';
    loginSubmit.id = 'login-submit';
    loginSubmit.disabled = true;
    loginSubmitWrapper.append(loginSubmit)

    this.container.append(cont)
    this.submitLoginForm(inputLogin, inputPassword, loginSubmit)
    return this.container
  }
}

export default LoginPage
