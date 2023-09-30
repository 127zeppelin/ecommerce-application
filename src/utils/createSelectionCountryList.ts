import { createEl } from "./createElement";

export const createSelectionCountryList = (container: HTMLElement, id: string) => {
  const inputCountry: HTMLDataListElement = createEl('datalist');
  inputCountry.id = id;

  const createCountry = (
    value: string,
    inputCountryDataList: HTMLDataListElement,
    elemText: string
  ) => {
    const country = createEl('option', undefined, elemText)
    country.value = value
    inputCountryDataList.append(country)
  }

  createCountry('DE', inputCountry, 'Germany')
  createCountry('PL', inputCountry, 'Poland')
  createCountry('BY', inputCountry, 'Belarus')
  createCountry('AT', inputCountry, 'Austria')
  createCountry('CA', inputCountry, 'Canada')

  container.append(inputCountry)
}