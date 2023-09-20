import { apiRoot } from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"



export const createCart = (productId: string, quantityCar: number) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .post({
      body: {
        currency: "USD",
        lineItems: [
          {
            productId: productId,
            quantity: quantityCar
          }
        ]
      }
    })
    .execute()
}

export const updateCartAddAuto = (idCart: string, versionCart: number, productId: string, quantityCar: number) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: idCart})
    .post({
      body: {
        version: versionCart,
        actions: [{
          action: "addLineItem",
          productId: productId,
          quantity: quantityCar
        }]
      }
    })
    .execute()
}


export const getCartById = (cartId: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
}