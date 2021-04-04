class Calculator {
  constructor(prevOpEl, currOpEl, opEl) {
    this.prevOpEl = prevOpEl
    this.currOpEl = currOpEl
    this.opEl = opEl
    this.enterHit = false
    this.clear()
  }
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete() {
    this.currentOperand = String(this.currentOperand).slice(0, -1)
    if (this.currentOperand.slice(-1) === '.') this.delete()
  }
  appendNumber(number) {
    if (this.enterHit) {
      this.enterHit = false
      this.currentOperand = ''
    }
    if (this.currentOperand === '0' && number === '0') return
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number
      return
    }
    if (number === '.' && currOpEl.textContent === '') {
      this.currentOperand = '0.'
      return
    }
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand += String(number)
  }
  chooseOperation(operation) {
    if (this.previousOperand === '' && this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    if (this.currentOperand !== '') {
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
    }
  }
  compute() {
    let computation
    const prevNum = parseFloat(this.previousOperand)
    const currNum = parseFloat(this.currentOperand)
    if (isNaN(prevNum) || isNaN(currNum)) return
    switch (this.operation) {
      case '+':
        computation = prevNum + currNum
        break;
      case '−':
        computation = prevNum - currNum
        break;
      case '×':
        computation = prevNum * currNum
        break;
      case '÷':
        computation = prevNum / currNum
        break;
      default:
        return
    }
    this.currentOperand = computation
    this.previousOperand = ''
    this.operation = undefined
  }
  updateDisplay() {
    if (typeof parseFloat(this.currentOperand) === 'number' || this.currentOperand === '') {
      this.currOpEl.innerText = this.currentOperand
    } else {
      this.currOpEl.innerText = parseFloat(this.currentOperand)
    }
    if (this.previousOperand) this.previousOperand = parseFloat(parseFloat(this.previousOperand).toFixed(6))
    if (this.operation) this.opEl.innerText = this.operation
    this.prevOpEl.innerText = this.previousOperand
  }
}

const bodyEl = document.body
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOpEl = document.querySelector('[data-previous-operand]')
const currOpEl = document.querySelector('[data-current-operand]')
const opEl = document.querySelector('[data-operator]')

bodyEl.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

const calculator = new Calculator(prevOpEl, currOpEl, opEl)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', (el) => {
    // operationButtons.forEach(operationButtonEl => {
    //   console.log(operationButtonEl === el.target)
    //   if (operationButtonEl !== el.target) operationButtonEl.removeAttribute('data-active')
    // })
    // el.target.toggleAttribute('data-active')
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

equalButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
  // calculator.currentOperand = ''
  calculator.enterHit = true
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})