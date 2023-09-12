import {
  TokenCache,
  TokenStore,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  ClientBuilder,
  UserAuthOptions,
} from '@commercetools/sdk-client-v2'
import { PROJECT_KEY } from '../constants/api-constants'
import { ApiRoot } from '@commercetools/platform-sdk'

const fetch = require('node-fetch')
const {
  createHttpClient
} = require('@commercetools/sdk-client-v2')
const {
  createApiBuilderFromCtpClient,
} = require('@commercetools/typescript-sdk')

export let tokenStore: TokenStore
export const tokenCache: TokenCache = {
  get(): TokenStore {
    return tokenStore
  },
  set(value: TokenStore): void {
    tokenStore = value
  },
}

export const userAuthOptions: UserAuthOptions = {
  username: '',
  password: '',
}

const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions =
{
  host: process.env.CTP_AUTH_URL || '',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID || '',
    clientSecret: process.env.CTP_CLIENT_SECRET || '',
    user: userAuthOptions,
  },
  scopes: [`manage_project:${PROJECT_KEY}`],
  tokenCache: tokenCache,
  fetch,
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL || '',
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID || '',
    clientSecret: process.env.CTP_CLIENT_SECRET || '',
  },
  fetch,
  tokenCache: tokenCache,
}
const httpMiddleware: HttpMiddlewareOptions = createHttpClient({
  host: process.env.CTP_API_URL,
  fetch,
})
const clientWithLogin =
  new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddleware)
    .withLoggerMiddleware()
    .build()

const client =
  new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddleware)
    .withLoggerMiddleware()
    .build();

//const userLogin = isTheUserLoggedIn()
export const apiRoot: ApiRoot = createApiBuilderFromCtpClient(client);
export const apiRootPass: ApiRoot = createApiBuilderFromCtpClient(clientWithLogin)