import { resolveMessageAddAndRemove } from "../../utils/resolvemsg";
import { createCart, getCartById, updateCartAddAuto } from "../cart/cartactions";


export const addInCart = (idProduct: string, quantityCar: number, carName: string) => {
  const doesTheShoppingCartExist: string | undefined | null = localStorage.getItem('curent_cart_id')

  if (!doesTheShoppingCartExist) {
    createCart(idProduct, quantityCar)
      .then(response => {
        const curentCartId: string = response.body.id
        localStorage.setItem('curent_cart_id', curentCartId);
        const resolveMessage: string = `${carName} car has been successfully added to cart`
        resolveMessageAddAndRemove(resolveMessage, true)
      })
      .catch(error => {
        const resolveMessage: string = `An error occurred when performing a request ${error}`
        resolveMessageAddAndRemove(resolveMessage, false)
      });
  } else {
    getCartById(doesTheShoppingCartExist)
      .then(response => {
        const curentCartId: string = response.body.id
        const curentCartState: string = response.body.cartState
        const curentCartVersion: number = response.body.version
        if (curentCartState === "Active") {
          try {
            updateCartAddAuto(curentCartId, curentCartVersion, idProduct, quantityCar);
            const resolveMessage: string = `${carName} car has been successfully added to cart`
            resolveMessageAddAndRemove(resolveMessage, true)
          } catch (error) {
            const resolveMessage: string = `An error occurred when performing a request ${error}`
            resolveMessageAddAndRemove(resolveMessage, false)
          }
        } else {
          createCart(idProduct, quantityCar)
            .then(responseAddCar => {
              const curentCartIdrespoce: string = responseAddCar.body.id
              localStorage.setItem('curent_cart_id', curentCartIdrespoce)
              const resolveMessage: string = `${carName} car has been successfully added to cart`
              resolveMessageAddAndRemove(resolveMessage, true)
            })
            .catch(error => {
              const resolveMessage: string = `An error occurred when performing a request ${error}`
              resolveMessageAddAndRemove(resolveMessage, false)
            });
        }
      })
      .catch(error => {
        const resolveMessage: string = `An error occurred when performing a request ${error}`
        resolveMessageAddAndRemove(resolveMessage, false)
      });
  }
}
