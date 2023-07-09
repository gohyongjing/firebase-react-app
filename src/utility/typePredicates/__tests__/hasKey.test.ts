import { hasKey } from "../hasKey";

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