import { apiRootPass, /*apiRoot,*/ tokenStore } from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"


export const getUser = () => {
  //const acessToken = tokenStore.token
  const acessTokenL0calStorage = localStorage.getItem('access_token')
  //console.log('Это ацесс токен матка Боска Чейнстоховска ', acessToken)
  console.log('Это ацесс токен из локального хранилища ', acessTokenL0calStorage)
  return apiRootPass
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .get({
        headers: {
          Authorization: `Bearer ${acessTokenL0calStorage}`,
        },})
    .execute();
};
