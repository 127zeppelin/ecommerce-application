export const showHidePasword = (passwordInput: HTMLInputElement) => {
  const showPassBtn = document.createElement('button')
  showPassBtn.classList.add('btn-show-pass')
  showPassBtn.type = 'button'
  showPassBtn.innerHTML = `<img src="./images/voka.svg">`
  passwordInput.insertAdjacentElement('afterend', showPassBtn)
  showPassBtn.addEventListener('click', (event) => {
    event.preventDefault()
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text'
    } else {
      passwordInput.type = 'password'
    }
  })
}
