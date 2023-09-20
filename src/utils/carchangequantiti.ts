export const chageQuantity = (btnSmaller: HTMLElement, input: HTMLInputElement, btnMore: HTMLElement) => {

  btnSmaller.addEventListener('click', () => {
    let currentValue: number = parseInt(input.value, 10);
    if (currentValue > 1) { currentValue -= 1 };
    input.value = currentValue.toString()
  })
  btnMore.addEventListener('click', () => {
    let currentValue: number = parseInt(input.value, 10);
    if (currentValue < 365) { currentValue += 1 }
    input.value = currentValue.toString()
  })
}


export const chageQuantityItemInCart =
  (
    btnSmaller: HTMLElement,
    input: HTMLInputElement,
    btnMore: HTMLElement,
    recalculateBtn: HTMLElement,
    startValue: number
  ) => {
    let currentValue: number = startValue;
    btnSmaller.addEventListener('click', () => {
      if (currentValue > 1) { currentValue -= 1 };
      input.value = currentValue.toString()
      if (startValue !== currentValue) {
        recalculateBtn.classList.add('active')
      } else {
        recalculateBtn.classList.remove('active')
      }
    })
    btnMore.addEventListener('click', () => {
      if (currentValue < 365) { currentValue += 1 }
      input.value = currentValue.toString()
      if (startValue !== currentValue) {
        recalculateBtn.classList.add('active')
      } else {
        recalculateBtn.classList.remove('active')
      }
    })
  }
