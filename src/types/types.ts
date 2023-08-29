export interface RequestBody {
  body: {
    version: number
    actions: Array<{
      action: string
      addressId: string
    }>
  }
}

export interface ElementOptions {
  tagName: string
  cssClass: string[]
  elementText?: string
  elementId?: string
  typeElement?: string
  nameElement?: string
  valueElement?: string
}
/*
export interface RegistrFormOptions {
  registrLogin: HTMLInputElement;
  registrPass: HTMLInputElement;
  registrName: HTMLInputElement;
  registrSurname: HTMLInputElement;
  registrDateOfBirth: HTMLInputElement;
  registrShipingCountry: HTMLInputElement;
  registrShipingStreet: HTMLInputElement;
  registrShipingPostalCode: HTMLInputElement;
  registrShipingCity: HTMLInputElement;
  registrBillingCountry: HTMLInputElement;
  registrBillingStreet: HTMLInputElement;
  registrBillingPostalCode: HTMLInputElement;
  registrBillingCity: HTMLInputElement;
  registrSubmit: HTMLButtonElement;
  onlyOneAdress: HTMLElement;
  billingAdressWrapper: HTMLElement;
  checkDefaultShipingAddress: HTMLElement;
  checkDefaultBillingAddress: HTMLElement;
}*/
