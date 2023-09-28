import {
  TokenCache,
  TokenStore,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
  UserAuthOptions,
  AnonymousAuthMiddlewareOptions,
  Client,
  TokenCacheOptions,
} from '@commercetools/sdk-client-v2'
import { PROJECT_KEY } from '../constants/apiConstants'
import { ApiRoot } from '@commercetools/platform-sdk'
import { isTheUserLoggedIn } from '../pages/login/isTheUserLogged'
import { decodePassword } from '../utils/encodePass'

const fetch = require('node-fetch')
const {
  createHttpClient
} = require('@commercetools/sdk-client-v2')
const {
  createApiBuilderFromCtpClient,
} = require('@commercetools/typescript-sdk')

export const tokenCacheOptions: TokenCacheOptions = {
  clientId: process.env.CTP_CLIENT_ID || '',
  projectKey: PROJECT_KEY,
  host: process.env.CTP_AUTH_URL || '',
}

export let tokenStore: TokenStore = {
  token: '', 
  expirationTime: 0
}; 

export const tokenCache: TokenCache = {
  get(): TokenStore {
    return tokenStore
  },
  set(value: TokenStore): void {
    tokenStore = value;
  },
}

export let tokenStoreAnonim: TokenStore = {
  token: '', 
  expirationTime: 0
}; 

export const tokenCacheAnonim: TokenCache = {
  get(): TokenStore {
    return tokenStoreAnonim
  },
  set(value: TokenStore): void {
    tokenStoreAnonim = value;
  },
}


export const userAuthOptions: UserAuthOptions = {
  username: '',
  password: '',
}

decodePassword()

export const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions =
{
  host: process.env.CTP_AUTH_URL || '',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID || '',
    clientSecret: process.env.CTP_CLIENT_SECRET || '',
    user: userAuthOptions,
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  tokenCache,
  fetch,
}

export const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL || '',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID || '',
    clientSecret: process.env.CTP_CLIENT_SECRET || '',
    //anonymousId: 'no-name-id'
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  fetch,
  tokenCache: tokenCacheAnonim
}
 

const httpMiddleware: HttpMiddlewareOptions = createHttpClient({
  host: process.env.CTP_API_URL,
  fetch,
  includeHeaders: true,
  includeResponseHeaders: true,
  refreshToken: 'foobar123',
  //credentialsMode: "include"
})


const userLogin = isTheUserLoggedIn()

let client: Client; // Глобальная переменная для хранения клиента
export let apiRoot: ApiRoot
const updateApiRoot = () => {
  apiRoot = createApiBuilderFromCtpClient(client);
};

export const initializeClient = (userIsLogin: boolean) => {
  const clientBuilder = new ClientBuilder()
    .withHttpMiddleware(httpMiddleware)
    .withLoggerMiddleware();

  if (userIsLogin) {
    clientBuilder.withPasswordFlow(passwordAuthMiddlewareOptions);
  } else {
    clientBuilder.withAnonymousSessionFlow(anonymousAuthMiddlewareOptions);
  }

  client = clientBuilder.build();
  updateApiRoot(); 
};

initializeClient(userLogin);

