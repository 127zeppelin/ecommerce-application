import { apiRoot } from "../../components/api"
import { PROJECT_KEY } from "../../constants/apiConstants"
import { resolveMessageAddAndRemove } from "../../utils/resolveMsg"
import { createCartPage } from "./cartPageCreate"



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
    .withId({ ID: idCart })
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

export const updateCartRemoveAuto = (idCart: string, versionCart: number, productId: string, quantityCar: number) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: idCart })
    .post({
      body: {
        version: versionCart,
        actions: [{
          action: "removeLineItem",
          lineItemId: productId,
          quantity: quantityCar,
        }]
      }
    })
    .execute()
}


export const getCartById = async (cartId: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: cartId })
    .get()
    .execute()
}


export const addDiscountCode = (idCart: string, versionCart: number, code: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: idCart })
    .post({
      body: {
        version: versionCart,
        actions: [{
          action: "addDiscountCode",
          code
        }]
      }
    })
    .execute()
}

export const deleteCart = (idCart: string, versionCart: number) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .withId({ ID: idCart })
    .delete({
      queryArgs: {
        version: versionCart,
      }
    })
    .execute()
}


export const CartDeletionAndPageRefresh = async (cartId: string, cartVersion: number, container: HTMLElement) => {
  await deleteCart(cartId, cartVersion);
  localStorage.removeItem('curent_cart_id')
  localStorage.removeItem('cart_version')
  const resolveMessage: string = 'Your cart is empty.'
  resolveMessageAddAndRemove(resolveMessage, true)
  createCartPage(container);
}