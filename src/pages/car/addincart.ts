
import { apiRoot, tokenCache} from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"



// const updateCart = (idCart: string, idProduct: string, quantityCar: number) => {
//   return apiRoot
//     .withProjectKey({ projectKey: PROJECT_KEY })
//     .me()
//     .carts()
//     .withId({ ID: idCart })
//     .post({
//       // headers: {
//       //   Authorization: `Bearer ${acessTokenL0calStorage}`,
//       // },
//       body: {
//         version: 1,
//         actions: [{
//           action: "addLineItem",
//           productId: idProduct,
//           variantId: 1,
//           quantity: quantityCar
//         }]
//       }
//     })
//     .execute
// }

const createCard = (productId: string, quantityCar: number, acessToken: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .carts()
    .post({
      headers: {
        Authorization: acessToken,
      },
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

export const addInCart = (/*idCart: string, */idProduct: string, quantityCar: number) => {
  const acessTokenL0calStorage = localStorage.getItem('access_token');
  //const requestHeader = acessTokenL0calStorage !== undefined ? {
  //   Authorization: `Bearer ${acessTokenL0calStorage}`,
  // } : tokenCache;
  const currentToken = tokenCache.get();
  const token = currentToken.token
  const tokenRf = currentToken.refreshToken
  const tokenTime = currentToken.expirationTime
  const theToken = `Bearer ${token}`
  console.log('ТОкен', token, tokenTime, tokenRf)
  const request = createCard(idProduct, quantityCar, theToken)

    .then(response => {
      console.log('Ответ апи добавление машины', response);
    })
    .catch(error => {
      console.error('Произошла ошибка при выполнении запроса', error);
    });
}

