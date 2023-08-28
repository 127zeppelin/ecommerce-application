import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/api-constants'

export const customerLogin = (email: string, password: string) => {
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .me()
    .login()
    .post({ body: { email: email, password: password } })
    .execute()
}
