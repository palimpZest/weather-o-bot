// @flow
const testHello = 'Hello';
const testWorld = ' World!';

const printFn = () => testHello + testWorld;

// console.log(printFn());
printFn();

/**
 * Prints a number as a string if number is found.
 * @param {int} x The number.
 * @returns {string} The string.
 */
function foo(x: ?number): string {
  if (x) {
    return `${x}`;
  }
  return 'default string';
}

foo();
