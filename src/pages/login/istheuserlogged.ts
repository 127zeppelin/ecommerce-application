import { LOGIN_LINK, REGISTR_LINK, MY_PROFILE_LINK, LOGAUT_BTN } from "../../components/app-components/constants";
import { TokenStore } from "@commercetools/sdk-client-v2";
import { pageList } from "../../Enums/PageIds";

const logoutAndRedirect = () => {
  localStorage.clear();
  window.location.href = 'index.html';
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
      // Выполняем редирект на страницу main (например, '/main.html')
      window.location.href = '#main';
    }
    // Проверяем, существует ли указанная страница
    if (!Object.values(pageList).includes(hash)) {
      // Выполняем редирект на страницу ошибки
      window.location.href = `/#${pageList.ERROR_PAGE}`;
    }
  }
  window.addEventListener('hashchange', handleHashChange);

  if (UserLoggedIn === true) {
    LOGIN_LINK?.classList.add('not-active');
    REGISTR_LINK?.classList.add('not-active');
    MY_PROFILE_LINK?.classList.remove('not-active');
    LOGAUT_BTN?.classList.remove('not-active');
    LOGAUT_BTN?.addEventListener('click', logoutAndRedirect);
  }
  return UserLoggedIn;
}