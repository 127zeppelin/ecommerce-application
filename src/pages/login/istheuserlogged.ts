import { TokenStore } from "@commercetools/sdk-client-v2";
import { pageList } from "../../Enums/PageIds";

export const logoutAndRedirect = () => {
  localStorage.clear();
  window.location.href = '#main';
  location.reload();
};

export const isTheUserLoggedIn = (): boolean => {
  const accessToken: string | null = localStorage.getItem('access_token');
  const expirationTokenTime: number | null = Number(localStorage.getItem('expiration_time'));
  const refreshTokenInStorage: string | undefined | null = localStorage.getItem('refresh_token');
  let UserLoggedIn: boolean = false;
  if (accessToken !== null) {
    const tokenStore: TokenStore = {
      token: accessToken,
      expirationTime: expirationTokenTime
    };
    if (refreshTokenInStorage !== null) {
      tokenStore.refreshToken = refreshTokenInStorage;
    }
    UserLoggedIn = true;
  }


  function handleHashChange() {
    const hash: string = window.location.hash.substring(1);
    if ((hash === 'login' || hash === 'registration') && UserLoggedIn) {
      window.location.href = '#main';
    }
    if (!hash) {
      window.location.href = '#main';
    }
    if (!Object.values(pageList).includes(hash)) {
      window.location.href = `/#${pageList.ERROR_PAGE}`;
    }
  }
  window.addEventListener('hashchange', handleHashChange);
  return UserLoggedIn;
}