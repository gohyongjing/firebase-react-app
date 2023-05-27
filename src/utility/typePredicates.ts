
export function hasKey<T extends (string | number | symbol)>(
  obj: unknown, key: T
): obj is { [key in T]: unknown } {
  return (!!obj) && typeof obj === 'object' && key in obj;
}

export function isFunction(
  maybeFunc: unknown
): maybeFunc is Function {
  return typeof maybeFunc === 'function';
}