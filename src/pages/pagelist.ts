export const pageList = {
  MAIN_PAGE: 'main',
  LOGIN_PAGE: 'login',
  REGISRATION_PAGE: 'registration',
  CUSTOMER_PAGE: 'user',
  ERROR_PAGE: 'error',
  CARS_PAGE: 'cars',
  _CUR_CAR: '',
  _CUR_CAT: '',
  get CUR_CAR() {
    if (!this._CUR_CAR) {
      const storedValue = localStorage.getItem('CUR_CAR')
      this._CUR_CAR =
        storedValue !== undefined && storedValue !== null ? storedValue : 'main'
    }
    return this._CUR_CAR
  },
  set CUR_CAR(value) {
    this._CUR_CAR = value
    localStorage.setItem('CUR_CAR', value)
  },
  get CUR_CAT() {
    if (!this._CUR_CAT) {
      const storedValue = localStorage.getItem('CUR_CAT')
      this._CUR_CAT =
        storedValue !== undefined && storedValue !== null ? storedValue : 'main'
    }
    return this._CUR_CAT
  },
  set CUR_CAT(value) {
    this._CUR_CAT = value
    localStorage.setItem('CUR_CAT', value)
  },
}
