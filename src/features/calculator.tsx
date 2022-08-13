export const calculate = (num1: string, operator: string, num2: string) => {
  let leftNum = parseFloat(num1);
  let rightNum = parseFloat(num2);

  if (operator == '') {
    return leftNum.toString();
  }
  if (num2 == '') {
    rightNum = leftNum;
  }
  if (operator === 'add') {
    return (leftNum + rightNum).toString();
  }
  if (operator === 'subtract') {
    return (leftNum - rightNum).toString();
  }
  if (operator === 'multiply') {
    return (leftNum * rightNum).toString();
  }
  if (operator === 'divide') {
    return (leftNum / rightNum).toString();
  }
};
