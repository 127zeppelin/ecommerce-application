import { apiRoot, projectKey } from "../../components/app-components/api";


export const customerRegistr = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  streetName: string,
  postalCode: string,
  city: string,
  country: string,
  streetNameBill: string,
  postalCodeBill: string,
  cityBill: string,
  countryBill: string,
  oneAdress: boolean
) => {
  if (oneAdress) {
    return apiRoot
      .withProjectKey({ projectKey })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          addresses: [{
            streetName: streetName,
            postalCode: postalCode,
            city: city,
            country: country
          }
          ]
        }
      })
      .execute();
  } else if (!oneAdress) {
    return apiRoot
      .withProjectKey({ projectKey })
      .me()
      .signup()
      .post({
        body: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          addresses: [{
            streetName: streetName,
            postalCode: postalCode,
            city: city,
            country: country
          },
          {
            streetName: streetNameBill,
            postalCode: postalCodeBill,
            city: cityBill,
            country: countryBill
          }
          ]
        }
      })
      .execute();
  }
  return apiRoot
}