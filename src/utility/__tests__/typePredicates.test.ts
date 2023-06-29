import { hasKey, isFunction } from "../typePredicates"

test('hasKey() returns true for objects with the particular key', () => {
  const objects: [object, string | number | symbol][] = [
    [ {'hello': 'world'}, 'hello'],
    [ {4: 5, 23: () => {}}, 23],
  ];
  for (let [obj, key] of objects) {
    expect(hasKey(obj, key)).toBe(true);
  }
});

test('hasKey() returns false for objects without the particular key', () => {
  const objects: [object, string | number | symbol][] = [
    [ {'hi': 'world'}, 'hello'],
    [ {121: () => {}}, 122],
  ];
  for (let [obj, key] of objects) {
    expect(hasKey(obj, key)).toBe(false);
  }
});

test('hasKey() returns false for non-objects', () => {
  const nonObjects: [unknown, string | number | symbol][] = [
    [ 'hello', 'hello'],
    [ (a: number) => (a + 122), 122],
    [ 12, 'hi' ]
  ];
  for (let [nonObj, key] of nonObjects) {
    expect(hasKey(nonObj, key)).toBe(false);
  }
});

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
