import { userAuthOptions } from "../components/api";


export const encodePasswordAndUsername = (usernameForCode: string, passwordForCode: string): void => {
  const encodeUsername =  usernameForCode
  const encodePassword =  passwordForCode
  localStorage.setItem('username', encodeUsername);
  localStorage.setItem('password', encodePassword);
}


export const decodePassword = (): void => {
  const decodeUsername = localStorage.getItem('username');
  const decodePass = localStorage.getItem('password');
  if (decodeUsername && decodePass) {
    userAuthOptions.username = decodeUsername;
    userAuthOptions.password = decodePass;
  }
}

