import { CSS_CLASSES } from "../constants/cssClases"
import { createEl } from "./createElement"

export const showHidePasword = (event: Event, passwordInput: HTMLInputElement) => {
  event.preventDefault()
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
}

export const addShowHidePaswordBtn = (passwordInput: HTMLInputElement) => {
  const showPassBtn = createEl('button', [CSS_CLASSES.btnShowPass], '<img src="./images/voka.svg">', undefined);
  showPassBtn.type = 'button'
  passwordInput.insertAdjacentElement('afterend', showPassBtn)
  showPassBtn.addEventListener('click', (event) => {
    showHidePasword(event, passwordInput)
  })
}



