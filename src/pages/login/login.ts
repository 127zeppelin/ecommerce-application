import Page from '../../temlates/page'
import { customerLogin } from './customerlogin'
import { tokenStore, userAuthOptions } from '../../components/api'
import {
  handleEmailInputChange,
  handlePasswordInputChange,
} from '../../components/validationinput'
import { showPasword } from '../../components/showpasword'
import { CSS_CLASSES } from '../../constants/cssclases'
import { createHtmlElement } from '../../utils/createelement'
import { isTheUserLoggedIn } from './istheuserlogged'

class LoginPage extends Page {
  TextObject = {
    MainTitle: 'Login Page',
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
  redirectIfCustomerWithLogin(){
    const userHaveLogin = isTheUserLoggedIn()
    if(userHaveLogin){
      window.location.hash = '#user'
    }
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

  submitLoginForm(
    inputLogin: HTMLInputElement,
    inputPass: HTMLInputElement,
    loginSubmit: HTMLButtonElement
  ) {
    const invalidInputMessageEmail = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.validationMsg],
    })
    inputLogin.insertAdjacentElement('afterend', invalidInputMessageEmail)
    let resultEmail = false

    const invalidInputMessagePass = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.validationMsg],
    })
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

      userAuthOptions.username = inputLoginvalue
      userAuthOptions.password = inputPassvalue
       
      try {
        const customerLoginAction = await customerLogin(inputLoginvalue, inputPassvalue)
        const response = customerLoginAction
        const responseHeaders = response.headers;
        console.log('Response на странице login:', response);
        console.log('Response Headers  на странице login:', responseHeaders);

        localStorage.setItem('access_token', tokenStore.token)
        localStorage.setItem(
          'expiration_time',
          String(tokenStore.expirationTime)
        )
        localStorage.setItem(
          'refresh_token',
          tokenStore.refreshToken ? tokenStore.refreshToken : ''
        )
        console.log('Страница login токен из хранилища:', tokenStore.token)
        console.log('Страница login токен из хранилища:', tokenStore.expirationTime)
        console.log('Страница login токен из хранилища:', tokenStore.refreshToken)
        const BODY: HTMLElement | null = document.querySelector('body')
        const resolveMessage: HTMLElement = document.createElement('div')
        resolveMessage.classList.add('resolve', 'successfully')
        if (
          resolveMessage instanceof HTMLElement &&
          BODY instanceof HTMLElement
        ) {
          resolveMessage.innerText = 'Logged in successfully'
          BODY.append(resolveMessage)
          setTimeout(() => {
            resolveMessage.remove()
          }, 4000)
          window.location.href = './#main'
        }
      } catch (error: any) {
        const BODY: HTMLElement | null = document.querySelector('body')
        const resolveMessage: HTMLElement = document.createElement('div')
        resolveMessage.classList.add('resolve')
        if (
          resolveMessage instanceof HTMLElement &&
          BODY instanceof HTMLElement
        ) {
          resolveMessage.innerText = error.message
          BODY.append(resolveMessage)
          setTimeout(() => {
            resolveMessage.remove()
          }, 4000)
        }
      }
    })
  }

  render() {
    this.redirectIfCustomerWithLogin()
    const cont = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.cont],
    })
    const loginWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.formWrap],
    })
    const loginForm = createHtmlElement({
      tagName: 'form',
      cssClass: [CSS_CLASSES.loginForm],
    })
    loginWrapper.append(loginForm)

    const pageButtons = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.pageBtns],
    })
    let pageButton = this.createPageButtons('#login', 'Log in')
    pageButtons.append(pageButton)
    pageButton.classList.add('login__btn_active')
    pageButton = this.createPageButtons('#registration', 'Sign up')
    pageButtons.append(pageButton)
    loginForm.append(pageButtons)

    const pageText = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.registrationPageText],
    })
    const textLineOne = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.registrationPageTextParagraph],
      elementText: 'Welcome back',
    })
    pageText.append(textLineOne)
    const textLineTwo = createHtmlElement({
      tagName: 'p',
      cssClass: [CSS_CLASSES.textParagraph],
      elementText: "We're so exited to see you again!",
    })
    pageText.append(textLineTwo)
    loginForm.append(pageText)

    const loginEmail = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    loginForm.append(loginEmail)

    const inputLogin = this.renderLogin(
      'input__email',
      'email',
      'username',
      'Email'
    )
    loginEmail.append(inputLogin)

    const loginPassword = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.inputContainer],
    })
    loginForm.append(loginPassword)

    const inputPassword = this.renderLogin(
      'input__password',
      'password',
      'password',
      'Password'
    )
    loginPassword.append(inputPassword)
    showPasword(inputPassword)

    cont.append(loginWrapper)

    const loginSubmitWrapper = createHtmlElement({
      tagName: 'div',
      cssClass: [CSS_CLASSES.submitFormWrapper],
    })
    loginForm.append(loginSubmitWrapper)
    const loginSubmit = document.createElement('button')
    loginSubmit.className = CSS_CLASSES.submitBtn
    loginSubmit.type = 'submit'
    loginSubmit.id = 'login-submit'
    loginSubmit.disabled = true
    loginSubmit.textContent = 'Log in'

    loginSubmitWrapper.append(loginSubmit)

    this.container.append(cont)
    this.submitLoginForm(inputLogin, inputPassword, loginSubmit)
    return this.container
  }
}

export default LoginPage
