import { TokenStore } from "@commercetools/sdk-client-v2"
import { tokenCache } from "../components/api"

export const setTokenStore = () => {
  const accessToken: string | null | undefined = localStorage.getItem('access_token')
  const expirationTokenTime: number | null | undefined = Number(
    localStorage.getItem('expiration_time')
  )
  const refreshTokenInStorage: string | undefined | null | undefined =
    localStorage.getItem('refresh_token')
  if (accessToken && expirationTokenTime && refreshTokenInStorage) {
    const newTokenStore: TokenStore = {
      token: accessToken,
      expirationTime: expirationTokenTime,
      refreshToken: refreshTokenInStorage
    };
    tokenCache.set(newTokenStore);
  }
}