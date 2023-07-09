import { isFunction } from "../isFunction";

test('isFunction() returns true for functions', () => {
  const functions = [
    () => {},
    console.log,
    (a: number, b: number) => a + b
  ];
  for (let func of functions) {
    expect(isFunction(func)).toBe(true);
  }
});

test('isFunction() returns false for inputs that are not a function', () => {
  const notFunctions = [
    1,
    'function',
    { function: () => {} }
  ];
  for (let notFunc of notFunctions) {
    expect(isFunction(notFunc)).toBe(false);
  }
});
