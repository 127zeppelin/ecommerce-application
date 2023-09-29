import { Category, ProductProjection } from '@commercetools/platform-sdk'
import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/apiConstants'
import { CSS_CLASSES } from '../../constants/cssClases'
import { createEl } from '../../utils/createElement'
import { FilterValues } from '../../types/types'
import { createCarsList } from './getProducts'
import { getHashValue } from '../../utils/gethashvalue'
import { resolveMessageAddAndRemove } from '../../utils/resolveMsg'

let filterValues: FilterValues = {}
let queryArgs = {}

export const getCarsWithFilter = () => {
  const filterValuesInlocalStorage = localStorage.getItem('CUR_FILTER')
  const parsedData = filterValuesInlocalStorage
    ? JSON.parse(filterValuesInlocalStorage)
    : {}
  return apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .productProjections()
    .search()
    .get(parsedData)
    .execute()
}


export const createCategorySelection = (
  categories: Category[],
  parentElement: HTMLElement,
  carsCardContainer: HTMLElement
) => {
  const currentHash = getHashValue()
  const btnArr: HTMLElement[] = []
  const allCarsBtn = createEl('button', [CSS_CLASSES.categoryBtn, CSS_CLASSES.activeBtn], 'All cars')
  allCarsBtn.setAttribute('id', 'allcars-btn');
  btnArr.push(allCarsBtn)

  allCarsBtn.addEventListener('click', async (event: Event) => {
    event.preventDefault()
    for (const btn of btnArr) {
      if (btn !== event.target) {
        btn.classList.remove(CSS_CLASSES.activeBtn)
      } else {
        btn.classList.add(CSS_CLASSES.activeBtn)
      }
    }
    localStorage.removeItem('CUR_FILTER')
    localStorage.removeItem('CUR_CATEGORY')
    filterValues.queryArgs = queryArgs

    if (!filterValues.queryArgs.filter) {
      filterValues.queryArgs.filter = []
    }
    const filteredArray = filterValues.queryArgs.filter.filter(
      (item) => !item.startsWith('categories.id:')
    )
    filterValues.queryArgs.filter = filteredArray
    localStorage.setItem('CUR_FILTER', JSON.stringify(filterValues))
    carsCardContainer.innerHTML = ''
    try {
      const loadCarsResult = await getCarsWithFilter()
      const carsArr: ProductProjection[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
    } catch (error: any) {
      const errorMessage: string = error.message;
      resolveMessageAddAndRemove( errorMessage, false)
    }
  })
  parentElement.append(allCarsBtn)
  for (const category of categories) {
    const categoryName = category.name['en-US']
    const categoryKey = category.key
    const categoryId = category.id
    if (currentHash == categoryKey) {
      allCarsBtn.classList.remove(CSS_CLASSES.activeBtn)
    }
    const curClass =
      currentHash === categoryKey
        ? [CSS_CLASSES.categoryBtn, CSS_CLASSES.activeBtn]
        : [CSS_CLASSES.categoryBtn]
    const categoryBtn = createEl('button', curClass, categoryName)
    categoryBtn.setAttribute('id',`${categoryKey}-btn`)
    btnArr.push(categoryBtn)
    categoryBtn.addEventListener('click', async (event: Event) => {
      event.preventDefault()
      for (const btn of btnArr) {
        if (btn !== event.target) {
          btn.classList.remove(CSS_CLASSES.activeBtn)
        } else {
          btn.classList.add(CSS_CLASSES.activeBtn)
        }
      }
      const clickedCategoryId = categoryId
      
      filterValues.queryArgs = queryArgs
      if (!filterValues.queryArgs.filter) {
        filterValues.queryArgs.filter = []
      }
      const filteredArray = filterValues.queryArgs.filter.filter(
        (item) => !item.startsWith('categories.id:')
      )
      filterValues.queryArgs.filter = filteredArray
      filterValues.queryArgs.filter?.push(
        `categories.id: "${clickedCategoryId}"`
      )
      localStorage.setItem('CUR_FILTER', JSON.stringify(filterValues))
      localStorage.setItem('CUR_CATEGORY', JSON.stringify(clickedCategoryId))
      carsCardContainer.innerHTML = ''
      try {
        const loadCarsResult = await getCarsWithFilter()
        const carsArr: ProductProjection[] = loadCarsResult.body.results
        createCarsList(carsArr, carsCardContainer)
      } catch (error: any) {
        const errorMessage: string = error.message;
        resolveMessageAddAndRemove( errorMessage, false)
      }
    })
    parentElement.append(categoryBtn)
  }
}

export const filterCarsFromCategory = async (
  carsCardContainer: HTMLElement
) => {
  const blockCategoryCar = createEl('div', [CSS_CLASSES.сategoryBtns])
  const apiRequestCategories = await apiRoot
    .withProjectKey({ projectKey: PROJECT_KEY })
    .categories()
    .get()
    .execute()
  const apiResponseCategories = apiRequestCategories
  const categoriesArr: Category[] = apiResponseCategories.body.results
  createCategorySelection(categoriesArr, blockCategoryCar, carsCardContainer)
  return blockCategoryCar
}

export const sortCars = (carsCardContainer: HTMLElement) => {
  const options = []
  const blockSortCars = createEl('div', [CSS_CLASSES.sortContainer])

  const sortLabel = createEl('label', [CSS_CLASSES.sortSelection], 'Sort cars:')
  sortLabel.setAttribute('for', 'sort');
  blockSortCars.append(sortLabel)

  const sortSelection = createEl('select', [CSS_CLASSES.sortSelection])
  sortSelection.setAttribute('id', 'sort')
  blockSortCars.append(sortSelection)
  

  const sortPlaceholder = createEl('option', [CSS_CLASSES.sortItem], 'Select option');
  sortPlaceholder.setAttribute('value', 'createdAt asc');
  options.push(sortPlaceholder)

  const sortNameUp = createEl('option', [CSS_CLASSES.sortItem], 'Sort by name A-Z'); 
  sortNameUp.setAttribute('value', 'name.EN-US asc');
  options.push(sortNameUp);

  const sortNameDown = createEl('option', [CSS_CLASSES.sortItem], 'Sort by name Z-A');
  sortNameDown.setAttribute('value', 'name.EN-US desc');
  options.push(sortNameDown)

  const sortPriceUp = createEl('option', [CSS_CLASSES.sortItem], 'Sort by price from high to low');
  sortPriceUp.setAttribute('value', 'price desc');
  options.push(sortPriceUp);

  const sortPriceDown = createEl('option', [CSS_CLASSES.sortItem], 'Sort by price from low to high')
  sortPriceDown.setAttribute('value', 'price asc');
  options.push(sortPriceDown)
  sortSelection.append(...options)
  sortSelection.addEventListener('change', async (event: Event) => {
    const selectedOption = (event.target as HTMLSelectElement)?.value
    localStorage.getItem('CUR_CATEGORY')
    filterValues.queryArgs = queryArgs
    filterValues.queryArgs.sort = selectedOption;
    localStorage.setItem('CUR_FILTER', JSON.stringify(filterValues))

    carsCardContainer.innerHTML = ''
    try {
      const loadCarsResult = await getCarsWithFilter()
      const carsArr: ProductProjection[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
    } catch (error: any) {
      const errorMessage: string = error.message;
      resolveMessageAddAndRemove( errorMessage, false)
    }
  })
  return blockSortCars
}

export const filerFromAtribute = (carsCardContainer: HTMLElement) => {
  const filterAtrbutesBtns = createEl('div', [CSS_CLASSES.atributesBtns])
  const colorsAuto = ['Transparent', 'White', 'Red', 'Blue', 'Gray', 'Black']
  const btnArr: HTMLElement[] = []

  for (const color of colorsAuto) {
    const colorBtn = createEl('button', [CSS_CLASSES.colorBtn])
    colorBtn.setAttribute('id', color)
    colorBtn.style.backgroundColor = color;
    colorBtn.addEventListener('click', async (event: Event) => {
      filterValues.queryArgs = queryArgs
      if (!filterValues.queryArgs.filter) {
        filterValues.queryArgs.filter = []
      }
      const filteredArray = filterValues.queryArgs.filter.filter(
        (item) => !item.startsWith('variants.attributes.color-auto:')
      )
      filterValues.queryArgs.filter = filteredArray
      if (color !== 'Transparent') {
        filterValues.queryArgs.filter?.push(
          `variants.attributes.color-auto: "${color}"`
        )
      }
      localStorage.setItem('CUR_FILTER', JSON.stringify(filterValues))
      for (const btn of btnArr) {
        if (btn !== event.target) {
          btn.classList.remove(CSS_CLASSES.activeBtn)
        } else {
          btn.classList.add(CSS_CLASSES.activeBtn)
        }
      }
      carsCardContainer.innerHTML = ''
      try {
        const loadCarsResult = await getCarsWithFilter()
        const carsArr: ProductProjection[] = loadCarsResult.body.results
        createCarsList(carsArr, carsCardContainer)
      } catch (error: any) {
        const errorMessage: string = error.message;
        resolveMessageAddAndRemove( errorMessage, false)
      }
    })
    btnArr.push(colorBtn)
  }
  filterAtrbutesBtns.append(...btnArr)
  return filterAtrbutesBtns
}
