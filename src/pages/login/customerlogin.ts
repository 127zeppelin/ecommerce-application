import { apiRoot, projectKey } from "../../components/app-components/api";

export const customerLogin = (email: string, password: string,) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: { email: email, password: password } })
    .execute();
}
