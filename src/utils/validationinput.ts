import { CSS_CLASSES } from '../constants/cssClases'
import { fieldsForValidationIfMultipleAddresses, fieldsForValidationIfSingleAddress } from '../constants/magicNumbers'

export const validationFunctions = {
  email: function (email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email)
  },
  password: function (password: string): string {
    let message = ''

    if (password.length < 8) {
      message = 'Password must be more than 8 characters'
      return message
    }

    if (!/[A-Z]/.test(password)) {
      message = 'Password must contain uppercase letters'
      return message
    }

    if (!/[a-z]/.test(password)) {
      message = 'Password must contain lowercase letters'
      return message
    }

    if (!/\d/.test(password)) {
      message = 'Password must contain at least one digit'
      return message
    }

    if (!/[!@#$%^&*]/.test(password)) {
      message = 'Password must contain at least one special character'
      return message
    }

    if (password.trim() !== password) {
      message = 'Password should not have spaces at the beginning or end'
      return message
    }

    return message
  },
}

export function handleEmailInputChange(
  targetInputElement: HTMLInputElement,
  invalidInputMessageEmail: HTMLElement
): boolean {
  const isValid = validationFunctions.email(targetInputElement.value)
  if (isValid) {
    targetInputElement.classList.remove(CSS_CLASSES.invalidInput)
    targetInputElement.classList.add(CSS_CLASSES.validInput)
    invalidInputMessageEmail.innerHTML = '<span>Valid Email</span>'
    return true
  } else {
    targetInputElement.classList.remove(CSS_CLASSES.validInput)
    targetInputElement.classList.add(CSS_CLASSES.invalidInput)
    invalidInputMessageEmail.innerHTML = '<span>This is not an email</span>'
    return false
  }
}

export function handlePasswordInputChange(
  targetInputElement: HTMLInputElement,
  invalidInputMessagePass: HTMLElement
): boolean {
  const result = validationFunctions.password(targetInputElement.value)

  if (result === '') {
    targetInputElement.classList.remove(CSS_CLASSES.invalidInput)
    targetInputElement.classList.add(CSS_CLASSES.validInput)
    invalidInputMessagePass.innerHTML = '<span>Valid Pass</span>'
    return true
  } else {
    const errorMessage = result // Получаем сообщение из объекта result
    targetInputElement.classList.remove(CSS_CLASSES.validInput)
    targetInputElement.classList.add(CSS_CLASSES.invalidInput)
    invalidInputMessagePass.innerHTML = `<span>${errorMessage}</span>` // Выводим сообщение об ошибке
    return false
  }
}

export const checkResultValidation = (
  email: boolean,
  password: boolean,
  button: HTMLButtonElement
) => {
  if (email && password) {
    button.disabled = false
  }
}

export const checkResultValidationRestration = (
  form: HTMLFormElement,
  oneAdress: boolean
): boolean => {
  const registrSubmit: HTMLButtonElement | null = form.querySelector(`.${CSS_CLASSES.registrSubmitBtn}`);
  const inputFieldsArray: (HTMLInputElement | null) [] = [
    form.querySelector(`.${CSS_CLASSES.inputEmail}`),
    form.querySelector(`.${CSS_CLASSES.inputPass}`),
    form.querySelector(`.${CSS_CLASSES.inputName}`),
    form.querySelector(`.${CSS_CLASSES.inputSurname}`),
    form.querySelector(`.${CSS_CLASSES.inputDate}`),
    form.querySelector(`.${CSS_CLASSES.inputShipStreet}`),
    form.querySelector(`.${CSS_CLASSES.inputShipCity}`),
    form.querySelector(`.${CSS_CLASSES.inputShipCode}`),
    form.querySelector(`.${CSS_CLASSES.inputCountryShip}`),
    form.querySelector(`.${CSS_CLASSES.inputBillStreet}`),
    form.querySelector(`.${CSS_CLASSES.inputBillCity}`),
    form.querySelector(`.${CSS_CLASSES.inputBillCode}`),
    form.querySelector(`.${CSS_CLASSES.inputBillCountry}`)
  ];

  let testPassed: boolean = true
  const numberOfFieldsToCheck: number = oneAdress ? fieldsForValidationIfSingleAddress
    : fieldsForValidationIfMultipleAddresses;
  let counter: number = 0

  inputFieldsArray.forEach((element) => {
    if (counter < numberOfFieldsToCheck) {
      if (element) {
        const fieldValue = element.value;
        if (fieldValue === '') {
          element.classList.add(CSS_CLASSES.emptyField)
          element.addEventListener('input', () => {
            element.classList.remove(CSS_CLASSES.emptyField)
          })
          testPassed = false
        }
      }
      counter++
    }
    if (inputFieldsArray[0] && inputFieldsArray[1] && registrSubmit) {
      registrSubmit.disabled = false
    }
  })
  return testPassed
}
