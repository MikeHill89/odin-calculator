//Operator functions
let n1;
let n2;
let operator;

const add = (n1, n2) => n1 + n2;
const substract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;


const operate = (operator, n1, n2) => {
  switch (operator) {
    case "add":
      return add(n1, n2);
    case "substract":
      return substract(n1,n2);
    case "multiply":
      return multiply(n1,n2);
    case "divide":
      return divide(n1,n2);
    default:
      break;
  }
};
