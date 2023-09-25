import { Category, ProductProjection } from '@commercetools/platform-sdk'
import { apiRoot } from '../../components/api'
import { PROJECT_KEY } from '../../constants/apiConstants'
import { CSS_CLASSES } from '../../constants/cssClases'
import { createHtmlElement } from '../../utils/createElement'
import { pageList } from '../pagelist'
import { FilterValues } from '../../types/types'
import { createCarsList } from './getProducts'

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
  const currentHash = window.location.hash.slice(1)
  const btnArr: HTMLElement[] = []
  const allCarsBtn = createHtmlElement({
    tagName: 'button',
    cssClass: [CSS_CLASSES.categoryBtn, CSS_CLASSES.activeBtn],
    elementText: 'All cars',
    elementId: `allcars-btn`,
  })
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

    if (
      filterValues.queryArgs.filter === null ||
      filterValues.queryArgs.filter === undefined
    ) {
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
      // eslint-disable-next-line
      console.log(error)
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
    const categoryBtn = createHtmlElement({
      tagName: 'button',
      cssClass: curClass,
      elementText: `${categoryName}`,
      elementId: `${categoryKey}-btn`,
    })
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
      const clickedCategoryKey = categoryKey as string
      const clickedCategoryId = categoryId

      pageList.CUR_CAT = clickedCategoryKey
      filterValues.queryArgs = queryArgs
      if (
        filterValues.queryArgs.filter === null ||
        filterValues.queryArgs.filter === undefined
      ) {
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
      localStorage.setItem('CUR_HASH', clickedCategoryKey)
      carsCardContainer.innerHTML = ''
      try {
        const loadCarsResult = await getCarsWithFilter()
        const carsArr: ProductProjection[] = loadCarsResult.body.results
        createCarsList(carsArr, carsCardContainer)
      } catch (error: any) {
        // eslint-disable-next-line
        console.log(error)
      }
    })
    parentElement.append(categoryBtn)
  }
}

export const filterCarsFromCategory = async (
  carsCardContainer: HTMLElement
) => {
  const blockCategoryCar = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.сategoryBtns],
  })
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
  const blockSortCars = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.sortContainer],
  })

  const sortLabel = createHtmlElement({
    tagName: 'label',
    cssClass: [CSS_CLASSES.sortSelection],
    elementText: 'Sort cars:',
    forElement: 'sort',
  })
  blockSortCars.append(sortLabel)

  const sortSelection = createHtmlElement({
    tagName: 'select',
    cssClass: [CSS_CLASSES.sortSelection],
    nameElement: 'sort',
    elementId: 'sort',
  }) as HTMLSelectElement
  blockSortCars.append(sortSelection)

  const sortPlaceholder = createHtmlElement({
    tagName: 'option',
    cssClass: [CSS_CLASSES.sortItem],
    valueElement: 'createdAt asc',
    elementText: 'Select option',
  })

  options.push(sortPlaceholder)

  const sortNameUp = createHtmlElement({
    tagName: 'option',
    cssClass: [CSS_CLASSES.sortItem],
    elementText: 'Sort by name A-Z ',
    valueElement: 'name.EN-US asc',
  })
  options.push(sortNameUp)
  const sortNameDown = createHtmlElement({
    tagName: 'option',
    cssClass: [CSS_CLASSES.sortItem],
    elementText: 'Sort by name Z-A',
    valueElement: 'name.EN-US desc',
  })
  options.push(sortNameDown)
  const sortPriceUp = createHtmlElement({
    tagName: 'option',
    cssClass: [CSS_CLASSES.sortItem],
    elementText: 'Sort by price from high to low',
    valueElement: 'price desc',
  })
  options.push(sortPriceUp)

  const sortPriceDown = createHtmlElement({
    tagName: 'option',
    cssClass: [CSS_CLASSES.sortItem],
    elementText: 'Sort by price from low to high',
    valueElement: 'price asc',
  })
  options.push(sortPriceDown)
  sortSelection.append(...options)
  sortSelection.addEventListener('change', async (event: Event) => {
    const selectedOption = (event.target as HTMLSelectElement)?.value
    localStorage.getItem('CUR_CATEGORY')
    filterValues.queryArgs = queryArgs
    filterValues.queryArgs.sort = `${selectedOption}`
    localStorage.setItem('CUR_FILTER', JSON.stringify(filterValues))

    carsCardContainer.innerHTML = ''
    try {
      const loadCarsResult = await getCarsWithFilter()
      const carsArr: ProductProjection[] = loadCarsResult.body.results
      createCarsList(carsArr, carsCardContainer)
    } catch (error: any) {
      // eslint-disable-next-line
      console.log(error)
    }
  })
  return blockSortCars
}

export const filerFromAtribute = (carsCardContainer: HTMLElement) => {
  const filterAtrbutesBtns = createHtmlElement({
    tagName: 'div',
    cssClass: [CSS_CLASSES.atributesBtns],
  })
  const colorsAuto = ['Transparent', 'White', 'Red', 'Blue', 'Gray', 'Black']
  const btnArr: HTMLElement[] = []

  for (const color of colorsAuto) {
    const colorBtn = createHtmlElement({
      tagName: 'button',
      cssClass: [CSS_CLASSES.colorBtn],
      elementId: `${color}`,
    })
    colorBtn.style.backgroundColor = `${color}`
    colorBtn.addEventListener('click', async (event: Event) => {
      filterValues.queryArgs = queryArgs
      if (
        filterValues.queryArgs.filter === null ||
        filterValues.queryArgs.filter === undefined
      ) {
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
        // eslint-disable-next-line
        console.log(error)
      }
    })
    btnArr.push(colorBtn)
  }
  filterAtrbutesBtns.append(...btnArr)
  return filterAtrbutesBtns
}
