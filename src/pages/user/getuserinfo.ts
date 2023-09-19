import { apiRoot, 
initializeClient,
tokenCache,
userAuthOptions} from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"


export const getUser = () => {
  const acessTokenL0calStorage = localStorage.getItem('access_token')
  const tokenStore = tokenCache.get()
  tokenStore.token
  console.log('acessTokenL0calStorage', acessTokenL0calStorage)
  console.log('tokenStore.token', tokenStore.token)
  console.log('userAuthOptions', userAuthOptions)
  initializeClient(true);
  //const apiRoot = getApiRoot();
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .get(/*{
      headers: {
        Authorization: `Bearer ${tokenStore.token}`,
      },
    }*/)
    .execute();
};
