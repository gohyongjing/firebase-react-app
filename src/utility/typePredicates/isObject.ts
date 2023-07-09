export function isObject(obj: unknown): obj is Object {
  return typeof obj === 'object'
    && !Array.isArray(obj)
    && obj !== null;
}
