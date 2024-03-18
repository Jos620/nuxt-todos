export function asArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value];
}
