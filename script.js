class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (number === '.' && this.currentOperand.toString().includes('.')){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currentOperand === '') return;
        if (this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + " " + operation;
        this.currentOperand = '';
    }

    compute(){
        let ans
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
                ans = prev + curr;
                break;
            case '-':
                ans = prev - curr;
                break;
            case 'x':
                ans = prev * curr;
                break;
            case '÷':
                ans = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = ans;
        this.operation = undefined;
        this.previousOperand = '';
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number){
        const strNumber = number.toString();
        const integerDigits = parseFloat(strNumber.split('.')[0])
        const decimalDigits = strNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigits)){
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null){
            return integerDisplay + '.' + decimalDigits;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = this.previousOperand;
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }


}


// main code
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})


equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
console.log("5")
$(document).on("keypress", function (e) {
    // use e.which
    console.log(e.which);
    const operations = [42, 43, 45, 47] // ascii codes for +,-,*,/
    var char = String.fromCharCode(e.which);
    if (char === '/') char = '÷';
    else if (char === '*') char = 'x';
    if (e.which == 13){
        calculator.compute();
        calculator.updateDisplay();
    }
    else if (e.which == 46 || (e.which >= 49 && e.which <= 57)){ // ., 1-9
        calculator.appendNumber(char);
        calculator.updateDisplay();
    } else if (operations.includes(e.which)){
        calculator.chooseOperation(char);
        calculator.updateDisplay();
    }
});

