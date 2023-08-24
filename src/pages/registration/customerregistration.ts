import { apiRoot, projectKey, tokenStore } from "../../components/app-components/api";


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
  /*streetNameBill: string,
  postalCodeBill: string,
  cityBill: string,
  countryBill: string,
  oneAdress: boolean*/
) => {
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
        addresses: [
          {
            streetName: streetName,
            postalCode: postalCode,
            city: city,
            country: country,
          }
        ]
      }
    })
    .execute(); 
}


export function submitRegistrForm(
    registrLogin: HTMLInputElement,
    registrPass: HTMLInputElement,
    registrName: HTMLInputElement,
    registrSurname: HTMLInputElement,
    registrDateOfBirth: HTMLInputElement,
    registrShipingCountry: HTMLInputElement,
    registrShipingStreet: HTMLInputElement,
    registrShipingPostalCode: HTMLInputElement,
    registrShipingCity: HTMLInputElement,
    registrBillingCountry: HTMLInputElement,
    registrBillingStreet: HTMLInputElement,
    registrBillingPostalCode: HTMLInputElement,
    registrBillingCity: HTMLInputElement,
    registrSubmit: HTMLElement, 
    oneAdress: boolean
    ) {
  const resolveMessage: HTMLElement | null = document.querySelector('.resolve');

  if (registrLogin && registrPass && registrName && registrSurname &&
    registrDateOfBirth && registrShipingCountry && registrShipingStreet && registrShipingCity &&
    registrShipingPostalCode && registrBillingCountry && registrBillingStreet && registrBillingCity &&
    registrBillingPostalCode && registrSubmit
  ) {
    registrSubmit.addEventListener('click', async (event) => {
      event.preventDefault();
      
      const registrLoginValue: string = registrLogin.value;
      const registrPassValue: string = registrPass.value;
      const registrNameValue: string = registrName.value;
      const registrSurnameValue: string = registrSurname.value;
      const registrDateOfBirthValue: Date = new Date(registrDateOfBirth.value);
      const registrShipingCountryValue: string = registrShipingCountry.value;
      const registrShipingStreetValue: string = registrShipingStreet.value;
      const registrShipingCityValue: string = registrShipingCity.value;
      const registrShipingPostalCodeValue: string = registrShipingPostalCode.value;
      const registrBillingCountryValue: string = registrBillingCountry.value;
      const registrBillingStreetValue: string = registrBillingStreet.value;
      const registrBillingCityValue: string = registrBillingCity.value;
      const registrBillingPostalCodeValue: string = registrBillingPostalCode.value;

      function formatDateToISODateOnly(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }
      
      const isoFormattedDate: string = formatDateToISODateOnly(registrDateOfBirthValue);

      try {
        await customerRegistr(
          registrLoginValue,
          registrPassValue,
          registrNameValue,
          registrSurnameValue,
          isoFormattedDate,
          registrShipingStreetValue,
          registrShipingPostalCodeValue,
          registrShipingCityValue,
          registrShipingCountryValue/*,
          registrBillingCountryValue,
          registrBillingStreetValue,
          registrBillingCityValue,
          registrBillingPostalCodeValue,
          oneAdress*/
        );
        localStorage.setItem('access_token', tokenStore.token);
        localStorage.setItem('expiration_time', String(tokenStore.expirationTime));
        localStorage.setItem('refresh_token', tokenStore.refreshToken ? tokenStore.refreshToken : '');
        console.log(tokenStore.token);
        window.location.href = './index.html'
      } catch (error: any) {
        console.error('Error fetching project details:', error.message);

        if (resolveMessage instanceof HTMLElement) {
          resolveMessage.innerText = error.message;
        }
      }
    })
  }
}