export const pageList = {
  LOGIN_PAGE: 'login',
  REGISRATION_PAGE: 'registration',
  CUSTOMER_PAGE: 'user',
  ERROR_PAGE: 'error',
  CART_PAGE: 'cart',
  CARS_PAGE: 'cars',
  ABOUT_PAGE: 'about',
  MAIN_PAGE: 'main',
  _CUR_CAR: '',
  get CUR_CAR() {
    if (!this._CUR_CAR) {
      const storedValue = localStorage.getItem('CUR_CAR')
      this._CUR_CAR =
        storedValue !== undefined && storedValue !== null ? storedValue : 'error'
    }
    return this._CUR_CAR
  },
  set CUR_CAR(value) {
    this._CUR_CAR = value
    localStorage.setItem('CUR_CAR', value)
  }
}
