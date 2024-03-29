export function hasKey<T extends (string | number | symbol)>(
  obj: unknown, key: T
): obj is { [key in T]: unknown } {
  return (!!obj) && typeof obj === 'object' && key in obj;
}
