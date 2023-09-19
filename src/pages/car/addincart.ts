import { resolveMessageAddAndRemove } from "../../utils/resolvemsg";
import { createCart, getCartById, updateCartAddAuto } from "../cart/cartactions";


export const addInCart = (idProduct: string, quantityCar: number, carName: string) => {
  const doesTheShoppingCartExist: string | undefined | null = localStorage.getItem('curent_cart_id')

  if (!doesTheShoppingCartExist) {
    const request = createCart(idProduct, quantityCar)
      .then(response => {
        console.log('Ответ апи добавление машины', response);
        const curentCartId: string = response.body.id
        localStorage.setItem('curent_cart_id', curentCartId);
        const resolveMessage: string = `${carName} car has been successfully added to cart`
        resolveMessageAddAndRemove(resolveMessage, true)
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса', error);
        const resolveMessage: string = `An error occurred when performing a request ${error}`
        resolveMessageAddAndRemove(resolveMessage, false)
      });
  } else {
    const request = getCartById(doesTheShoppingCartExist)
      .then(response => {
        console.log('Текущая карта', response);
        const curentCartId: string = response.body.id
        const curentCartState: string = response.body.cartState
        const curentCartVersion: number = response.body.version
        console.log('Карта активна', curentCartState);
        if (curentCartState === "Active") {
          try {
            console.log('Обновление корзины')
            const request = updateCartAddAuto(curentCartId, curentCartVersion, idProduct, quantityCar);
            const responce = request
            console.log(responce)
            const resolveMessage: string = `${carName} car has been successfully added to cart`
            resolveMessageAddAndRemove(resolveMessage, true)
          } catch (error) {
            // Логируем ошибку, возникшую в функции updateCartAddAuto()
            console.error('Ошибка в функции updateCartAddAuto():', error);
            const resolveMessage: string = `An error occurred when performing a request ${error}`
            resolveMessageAddAndRemove(resolveMessage, false)
          }
        } else {
          const request = createCart(idProduct, quantityCar)
            .then(response => {
              console.log('Ответ апи добавление машины', response);
              const curentCartId: string = response.body.id
              localStorage.setItem('curent_cart_id', curentCartId)
              const resolveMessage: string = `${carName} car has been successfully added to cart`
              resolveMessageAddAndRemove(resolveMessage, true)
            })
            .catch(error => {
              console.error('Произошла ошибка при выполнении запроса', error);
              const resolveMessage: string = `An error occurred when performing a request ${error}`
              resolveMessageAddAndRemove(resolveMessage, false)
            });
        }
      })
      .catch(error => {
        console.error('Произошла ошибка при выполнении запроса', error);
        const resolveMessage: string = `An error occurred when performing a request ${error}`
        resolveMessageAddAndRemove(resolveMessage, false)
      });
  }
}

