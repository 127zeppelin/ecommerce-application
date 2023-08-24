export const validationFunctions = {
  email: function (email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  },
  password: function (password: string): { isValid: boolean, message: string } {
    let message = '';

    if (password.length < 8) {
      message = 'Password must be more than 8 characters';
      return { isValid: false, message };
    }

    if (!/[A-Z]/.test(password)) {
      message = 'Password must contain uppercase letters';
      return { isValid: false, message };
    }

    if (!/[a-z]/.test(password)) {
      message = 'Password must contain lowercase letters';
      return { isValid: false, message };
    }

    if (!/\d/.test(password)) {
      message = 'Password must contain at least one digit';
      return { isValid: false, message };
    }

    if (!/[!@#$%^&*]/.test(password)) {
      message = 'Password must contain at least one special character';
      return { isValid: false, message };
    }

    if (password.trim() !== password) {
      message = 'Password should not have spaces at the beginning or end';
      return { isValid: false, message };
    }

    return { isValid: true, message: '' };
  }
};



export function handleEmailInputChange(
  targetInputElement: HTMLInputElement,
  invalidInputMessageEmail: HTMLDivElement): boolean {
  const isValid = validationFunctions.email(targetInputElement.value);
  if (isValid) {
    targetInputElement.classList.remove('invalid-input');
    targetInputElement.classList.add('valid-input');
    invalidInputMessageEmail.innerHTML = '<span>Valid Email</span>';
    return true;
  } else {
    targetInputElement.classList.remove('valid-input');
    targetInputElement.classList.add('invalid-input');
    invalidInputMessageEmail.innerHTML = '<span>This is not an email</span>';
    return false;
  }
}

export function handlePasswordInputChange(
  targetInputElement: HTMLInputElement,
  invalidInputMessagePass: HTMLDivElement): boolean {
  const result = validationFunctions.password(targetInputElement.value);

  if (result.isValid) {
    targetInputElement.classList.remove('invalid-input');
    targetInputElement.classList.add('valid-input');
    invalidInputMessagePass.innerHTML = '<span>Valid Pass</span>';
    return true;
  } else {
    const errorMessage = result.message; // Получаем сообщение из объекта result
    targetInputElement.classList.remove('valid-input');
    targetInputElement.classList.add('invalid-input');
    invalidInputMessagePass.innerHTML = `<span>${errorMessage}</span>`; // Выводим сообщение об ошибке
    return false;
  }
}




export const checkResultValidation = (email: boolean, password: boolean, button: HTMLButtonElement) => {
  if (email && password) { button.disabled = false; }
}