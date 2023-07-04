//DOM elements
const display = document.querySelector('.current');
const previous = document.querySelector('.previous');
const numbers = document.querySelectorAll('.number');
const resetButton = document.querySelector('.reset');
const deleteButton = document.querySelector('.delete');
const operators = document.querySelectorAll('.operator');
const calculateButton = document.querySelector('#calculate');
const dotButton = document.querySelector('#dot');

let displayedValue = ""; // the value shown inside of the display
let savedValue = ""; // stores displayValue when an operator is clicked
let operatorUsed; // stores which operator was clicked
let result; //stores the result of the operate() call

function disableDotButton(){
  dotButton.disabled = true;
}

function enableDotButton(){
  dotButton.disabled = false;
}

function disableOperators(){
  operators.forEach((operator) => {
    operator.disabled = true;
  })
}

function enableOperators(){
  operators.forEach((operator) => {
    operator.disabled = false;
  })
}

function disableNumbers(){
  numbers.forEach((number) => {
    number.disabled = true;
  })
}

function enableNumbers(){
  numbers.forEach((number) => {
    number.disabled = false;
  })
}

dotButton.addEventListener('click', () => {
  disableDotButton();
})


//resets the calculator
resetButton.addEventListener('click', () => {
    enableOperators();
    enableNumbers();
    displayedValue = "";
    savedValue = "";
    operatorUsed = "";
    result = "";
    display.textContent ="";
    previous.textContent = "";
    deleteButton.disabled = false
    calculateButton.disabled = false;
    console.log('reset everything');
});

// deletes the last entered number from the displayedValue
deleteButton.addEventListener('click', () => {
    console.log('deleted last number or operator');
    const deleteLastNumber = display.textContent.slice(0, -1);
    display.textContent = deleteLastNumber;
    if (display.textContent.includes('.')) {
      disableDotButton();
    } else {
      enableDotButton();
    }
    displayedValue = parseFloat(display.textContent);
});

// add functions to all number buttons to update displayValue
numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        if (display.textContent === "error"){
          resetButton.click();
        }
        let clickedNumber = event.currentTarget.dataset.value;
        display.textContent += clickedNumber;
        displayedValue = parseFloat(display.textContent);
        console.log(parseFloat(clickedNumber));
        if (display.textContent.length > 15){
          display.textContent = display.textContent.substring(0,15);
        }
      deleteButton.disabled = false;
      calculateButton.disabled = false;
    })
})

// add functions to the operate buttons
// if an operator was used previously it will evaluate the savedValue and the current displayedValue
operators.forEach((operator) => {
    enableDotButton();
    deleteButton.disabled = false;
    calculateButton.disabled = false;
    
    operator.addEventListener('click', (event) => {
      numbers.forEach((number) => {
      number.disabled = false;
      })
      let clickedOperator = event.currentTarget;  
        if (operatorUsed && result){
            savedValue = result;
            operatorUsed = clickedOperator.id;
            previous.textContent = savedValue + clickedOperator.textContent;
            display.textContent = "";
            result = "";
            return;
        }
        operate(operatorUsed,savedValue,displayedValue); 
        savedValue = displayedValue;
        displayedValue = parseFloat(display.textContent);
        operatorUsed = clickedOperator.id;
        console.log(operatorUsed);
        previous.textContent = savedValue + clickedOperator.textContent;
        display.textContent = "";
        result = "";
  
    });
})

// function that evaluates the calculation based on the selected operator
// If division is done by 0 it returns an error.
const operate = (operator, n1, n2) => {
    if (n2 === ""){
      return calculateButton.click()
    }
    switch (operator) {
        case "add":
            result = n1 + n2;
            break;
        case "subtract":
            result = n1 - n2;
            break
        case "multiply":
            result = n1 * n2;
            break;
        case "divide":
            if (n1 === 0 || n2 === 0 ) {
             return display.textContent = "error";
            }
            result = n1 / n2;
            break;
        default:
            return n2; // Return the second value if operator is not supported
    }
    previous.textContent += `${displayedValue}`;
    displayedValue = result;
    return result;
};

//calculates the final result, disables the delete button and numbers until all clear or an operator is pressed.
calculateButton.addEventListener('click', () =>{
    if (savedValue === "" || displayedValue === ""){
      deleteButton.disabled = true;
      disableOperators();
      disableNumbers();
      calculateButton.disabled = true;
      previous.textContent = "";
      return display.textContent = "error";
    }
    
    display.textContent = operate(operatorUsed,savedValue, displayedValue);
    result = parseFloat(display.textContent)
    if (display.textContent.length > 15){
      display.textContent = display.textContent.substring(0,15);
    }
    previous.textContent = "";
    deleteButton.disabled = true;
    calculateButton.disabled = true;
    numbers.forEach((number) => {
      number.disabled = true;
    })
});
