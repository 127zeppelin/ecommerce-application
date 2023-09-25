export const showHidePasword = (event: Event, passwordInput: HTMLInputElement) => {
  event.preventDefault()
  passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
}



export const addShowHidePaswordBtn = (passwordInput: HTMLInputElement) => {
  const showPassBtn = document.createElement('button')
  showPassBtn.classList.add('btn-show-pass')
  showPassBtn.type = 'button'
  showPassBtn.innerHTML = `<img src="./images/voka.svg">`
  passwordInput.insertAdjacentElement('afterend', showPassBtn)
  showPassBtn.addEventListener('click', (event) => {
    showHidePasword(event, passwordInput)
  })
}



