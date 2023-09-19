import { apiRoot, initializeClient } from "../../components/api"
import { PROJECT_KEY } from "../../constants/api-constants"

export const getUser = () => {
  initializeClient(true);
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .get()
    .execute();
};
