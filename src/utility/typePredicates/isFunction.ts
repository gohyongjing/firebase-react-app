export function isFunction(
  maybeFunc: unknown
): maybeFunc is Function {
  return typeof maybeFunc === 'function';
}
