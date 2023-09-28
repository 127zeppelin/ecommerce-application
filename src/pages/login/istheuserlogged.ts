export const logoutAndRedirect = () => {
  localStorage.clear()
  window.location.href = '#main'
 location.reload()
}

export const isTheUserLoggedIn = (): boolean => {
  const accessToken: string | null | undefined = localStorage.getItem('access_token')
  const expirationTokenTime: number | null | undefined = Number(
    localStorage.getItem('expiration_time')
  )
  const refreshTokenInStorage: string | undefined | null | undefined =
    localStorage.getItem('refresh_token')
  let UserLoggedIn: boolean = false
  if (accessToken && expirationTokenTime && refreshTokenInStorage) {
    UserLoggedIn = true
  }
  return UserLoggedIn
}
