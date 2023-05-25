const display = document.querySelector('.display-digits');
const digits = document.querySelectorAll('.grid-item');
const resetButton = document.querySelector('.reset');
const deleteButton = document.querySelector('.delete');
const operators = document.querySelectorAll('.operator');
const calculateButton = document.querySelector('.calculate');
let tempnumber;
let operator;
let n1;

const getNumberFromDisplay = () => {
    tempnumber = parseFloat(display.innerText);
    return tempnumber;
}
const getOperator = (event) => {
    n1 = tempnumber;
    tempnumber = 0;
    operator = event.target.id;
    return display.innerText = "";
    //save the tempnumber as n1 get the operator and return it
}
const updateDisplay = (event) => {
    const number = event.target.innerText;
    display.innerText += number;
    getNumberFromDisplay();
}
digits.forEach((digit) => {
    digit.addEventListener('click', updateDisplay);
})

operators.forEach((operator) => {
    operator.addEventListener('click', getOperator);
})
const resetCalc = () => {
    display.innerText = ""; //reset display
    tempnumber = 0;
    n1 = 0;
}
const removeDigit = () => {
    display.innerText = display.innerText.slice(0, -1);
    getNumberFromDisplay();
}
deleteButton.addEventListener('click', removeDigit);
resetButton.addEventListener('click',resetCalc);

calculateButton.addEventListener('click', function operate() {
    switch (operator) {
        case "multiply":
            return display.innerText = n1 * tempnumber;
        default:
            return display.innerText = "operator not recognized";
    }
});
