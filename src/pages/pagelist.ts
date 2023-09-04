export const pageList = {
  MAIN_PAGE: 'main',
  LOGIN_PAGE: 'login',
  REGISRATION_PAGE: 'registration',
  CUSTOMER_PAGE: 'user',
  ERROR_PAGE: 'error',
  CARS_PAGE: 'cars',
  _CUR_CAR: '',
  get CUR_CAR() {
    if (!this._CUR_CAR) {
      const storedValue = localStorage.getItem('CUR_CAR');
      this._CUR_CAR = storedValue !== undefined && storedValue !== null ? storedValue : 'main';
    }
    return this._CUR_CAR;
  },

  set CUR_CAR(value) {
    this._CUR_CAR = value;
    localStorage.setItem('CUR_CAR', value); 
  }
}

