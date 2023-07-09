import { isObject } from "../isObject";

test('isObject() returns true for objects', () => {
  const objects = [
    {},
    { 1: [123, {456: 789}]} ,
    { 'hello': 'world' },
    { 'func': (a: number, b: number) => a + b }
  ];
  for (let obj of objects) {
    expect(isObject(obj)).toBe(true);
  }
});

test('isObject() returns false for inputs that are not an object', () => {
  const notObjects = [
    1,
    'function',
    () => {},
    null,
    undefined,
    [{ 1: 2 }, { 3: 'abc' }]
  ];
  for (let notObj of notObjects) {
    expect(isObject(notObj)).toBe(false);
  }
});

