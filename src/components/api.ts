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

export const projectKey = 'rs-school-project';


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
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: projectKey,
      credentials: {
        clientId: 'p7DHGpoZFDtV4FGQBjB6uP47',
        clientSecret: 'mcvm1UxDfWioQdwtB3E4vysmzcBdLKhV',
      },
      fetch,
      tokenCache: tokenCache,
    })
  const httpMiddleware: HttpMiddlewareOptions = createHttpClient({
    host: 'https://api.europe-west1.gcp.commercetools.com',
    fetch,
  })

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })
  return client
}

export const apiRoot = createApiBuilderFromCtpClient(getClient())
