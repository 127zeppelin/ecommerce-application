import { apiRootPass } from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"


export const getUser = () => {
  const acessTokenL0calStorage = localStorage.getItem('access_token')
  return apiRootPass
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .get({
      headers: {
        Authorization: `Bearer ${acessTokenL0calStorage}`,
      },
    })
    .execute();
};
