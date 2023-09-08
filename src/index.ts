import App from './pages/app/app'
import './style.css'
import { isTheUserLoggedIn } from './pages/login/istheuserlogged'
import { tokenCache, tokenStore } from './components/api'
import { TokenStore } from '@commercetools/sdk-client-v2'

const app = new App()
app.run()
const userLogin = isTheUserLoggedIn()
const setTokenStore = (boolean: boolean) => {
  const accessToken: string | null | undefined = localStorage.getItem('access_token')
  const expirationTokenTime: number | null | undefined = Number(
    localStorage.getItem('expiration_time')
  )
  const refreshTokenInStorage: string | undefined | null | undefined =
    localStorage.getItem('refresh_token')
    console.log('accessToken', accessToken)
    console.log('expirationTokenTime', expirationTokenTime)
    console.log('refreshTokenInStorage', refreshTokenInStorage)
  if (accessToken && expirationTokenTime && refreshTokenInStorage) {
    const newTokenStore: TokenStore = {
      token: accessToken,
      expirationTime: expirationTokenTime,
      refreshToken: refreshTokenInStorage
    };
    tokenCache.set(newTokenStore);
    console.log(tokenCache)
  }
}
setTokenStore(userLogin)

console.log('Токен Сторе', tokenStore)