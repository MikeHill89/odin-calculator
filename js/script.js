//DOM elements
const display = document.querySelector('.current');
const previous = document.querySelector('.previous');
const numbers = document.querySelectorAll('.number');
const resetButton = document.querySelector('.reset');
const deleteButton = document.querySelector('.delete');
const operators = document.querySelectorAll('.operator');
const calculateButton = document.querySelector('#calculate');

let currentValue = 0;
let savedValue = 0;
let operatorUsed;
let result;

resetButton.addEventListener('click', () => {
    currentValue = 0;
    savedValue = 0;
    operatorUsed = "";
    result = "";
    display.textContent ="";
    previous.textContent = "";
    console.log('reset everything');
});

deleteButton.addEventListener('click', () => {
    console.log('deleted last number or operator');
    const deleteLastNumber = display.textContent.slice(0, -1);
    display.textContent = deleteLastNumber;
    currentValue = parseFloat(display.textContent);
    
});

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        let clickedNumber = event.currentTarget.dataset.value;
        display.textContent += clickedNumber;
        currentValue = parseFloat(display.textContent);
        console.log(parseFloat(clickedNumber));
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        savedValue = currentValue;
        currentValue = 0;
        let clickedOperator = event.currentTarget;
        operatorUsed = clickedOperator.textContent;
        console.log(operatorUsed);
        display.textContent = "";
        previous.textContent = `${savedValue + operatorUsed} `;
    });
})
const operate = (operator, n1, n2) => {
    console.log("Checking Operands and Operator");
    console.log(`Saved value = ${savedValue}`)
    console.log(`Operator used = ${operatorUsed}`)
    console.log(`Current value = ${currentValue}`);
    let result;
    switch (operator) {
        case "+":
            result = n1 + n2;
            break;
        case "-":
            result = n1 - n2;
            break;
        case "X":
            result = n1 * n2;
            break;
        case "÷":
            result = n1 / n2;
            break;
        default:
            return n2; // Return the second value if operator is not supported
    }
    console.log(`The result is ${result}`);
    previous.textContent += `${currentValue}`;
    currentValue = result;
    return result;
};

calculateButton.addEventListener('click', () =>{ 
    display.textContent = operate(operatorUsed,savedValue, currentValue);
});
