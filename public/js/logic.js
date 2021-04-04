class Calculator {
  constructor(calcEl, prevOpEl, currOpEl, opEl) {
    this.calcEl = calcEl
    this.prevOpEl = prevOpEl
    this.currOpEl = currOpEl
    this.opEl = opEl
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.ghostCurrentOperand = ''
    this.ghostPreviousOperand = ''
    this.operation = ''
  }
  delete() {
    this.currentOperand = String(this.currentOperand).slice(0, -1)
    if (String(this.currentOperand).slice(-1) === '.') this.delete()
  }
  sortButtons(buttonType, buttonValue) {
    this.buttonType = buttonType
    this.buttonValue = buttonValue
    if (!this.validCombination()) return
    if (this.buttonType === 'number') {
      this.appendNumber(this.buttonValue)
    }
    if (this.buttonType === 'operator') {
      this.chooseOperation(this.buttonValue)
    }
    if (this.buttonType === 'equal') {
      this.compute()
      this.currentOperand = this.previousOperand
      this.previousOperand = ''
      this.ghostCurrentOperand = ''
      this.operation = ''
    }
    if (this.buttonType === 'delete') {
      this.delete()
    }
    if (this.buttonType === 'all-clear') {
      this.clear()
    }
    this.updateDisplay()
  }
  validCombination() {
    if (this.currentOperand === '' && this.previousOperand === '' && this.buttonType !== 'number') { console.log('not valid'); return false }
    if (this.operation === '' && this.buttonType === 'equal') { console.log('not valid'); return false }
    return true
  }
  appendNumber(number) {
    if (number === '.') {
      if (String(this.currentOperand).includes('.')) return
      if (!this.currentOperand || this.currentOperand === '0') return this.currentOperand = '0.'
    }
    if (this.currentOperand == '0' && number === '0') return
    if (this.currentOperand == '0') return this.currentOperand = number
    this.currentOperand += number
    this.ghostCurrentOperand = ''
  }
  chooseOperation(operation) {
    console.log(operation, this.operation)
    if (this.operation === operation && this.currentOperand === '') this.currentOperand = this.ghostCurrentOperand
    this.operation = operation
    if (this.previousOperand !== '' && this.currentOperand !== '') this.compute()
    if (this.currentOperand !== '') {
      if (String(this.currentOperand).slice(-1) === '.') this.delete() 
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  }
  compute() {
    let result
    const prevNum = parseFloat(this.previousOperand)
    const currNum = parseFloat(this.currentOperand)
    // console.log(prevNum, currNum)
    if (isNaN(prevNum) || isNaN(currNum)) return
    if (this.operation === '+') {
      result = prevNum + currNum
    }
    if (this.operation === '−') {
      result = prevNum - currNum
    }
    if (this.operation === '×') {
      result = prevNum * currNum
    }
    if (this.operation === '÷') {
      if (currNum === 0) return location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      result = prevNum / currNum
    }
    if (this.ghostCurrentOperand === '') { this.ghostCurrentOperand = this.currentOperand }
    this.previousOperand = result
    this.currentOperand = ''
  }
  updateDisplay() {
    if (this.ghostCurrentOperand && this.buttonType !== 'delete' && this.buttonType !== 'equal') {
      currOpEl.classList.add('ghost-number')
      this.currOpEl.innerText = String(this.ghostCurrentOperand)
    } else {
      currOpEl.classList.remove('ghost-number')
      this.currOpEl.innerText = String(this.currentOperand)
    }
    this.prevOpEl.innerText = String(this.previousOperand)
    this.opEl.innerText = String(this.operation)
  }
}

const bodyEl = document.body
const calculatorEl = document.querySelector('#calculator')
const prevOpEl = document.querySelector('[data-previous-operand]')
const currOpEl = document.querySelector('[data-current-operand]')
const opEl = document.querySelector('[data-operator]')
const buttonTextEls = document.getElementsByClassName('buttonText')

window.addEventListener('load', el => {
  setTimeout(() => {
    Array.from(buttonTextEls).forEach(buttonTextEl => {
      buttonTextEl.style.display = 'block'
    });
  }, 300);
})

bodyEl.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

const calculator = new Calculator(calculatorEl, prevOpEl, currOpEl, opEl)

calculatorEl.addEventListener('click', el => {
  if (el.target.nodeName !== 'BUTTON') return
  calculator.sortButtons(el.target.dataset.type, el.target.dataset.value)
})

calculatorEl.addEventListener('mouseover', el => {
  if (el.target.nodeName !== 'BUTTON') return
  if (el.target.dataset.type === 'operator' && el.target.dataset.value === calculator.operation && calculator.ghostCurrentOperand) {
    currOpEl.classList.add('ghost-number')
    currOpEl.innerText = String(calculator.ghostCurrentOperand)
  }
})

calculatorEl.addEventListener('mouseout', el => {
  if (el.target.nodeName !== 'BUTTON') return
  if (el.target.dataset.type === 'operator' && calculator.ghostCurrentOperand) {
    currOpEl.classList.remove('ghost-number')
    currOpEl.innerText = ''
  }
})
