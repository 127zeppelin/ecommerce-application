import {
  TokenCache,
  TokenStore,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'


const fetch = require('node-fetch')
const {
  createClient,
  createHttpClient,
  createAuthForClientCredentialsFlow,
} = require('@commercetools/sdk-client-v2')
const { createApiBuilderFromCtpClient } = require('@commercetools/platform-sdk')

export const projectKey = process.env.CTP_PROJECT_KEY

export let tokenStore: TokenStore
export const tokenCache: TokenCache = {
  get(): TokenStore {
    return tokenStore
  },
  set(value: TokenStore): void {
    tokenStore = value
  },
}

export const getClient = () => {
  const authMiddleware: AuthMiddlewareOptions =
    createAuthForClientCredentialsFlow({
      host: process.env.CTP_AUTH_URL,
      projectKey: projectKey,
      credentials: {
        clientId: process.env.CTP_CLIENT_ID,
        clientSecret: process.env.CTP_CLIENT_SECRET,
      },
      fetch,
      tokenCache: tokenCache,
    })
  const httpMiddleware: HttpMiddlewareOptions = createHttpClient({
    host: process.env.CTP_API_URL,
    fetch,
  })

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  return client
}

export const apiRoot = createApiBuilderFromCtpClient(getClient())
