export function safeStringify(
  data: unknown,
  replacer?: (this: unknown, key: string, value: unknown) => unknown,
  space?: string | number,
  defaultValue?: string,
  stringifyArgs?: (
    value: unknown,
    replacer?: (this: unknown, key: string, value: unknown) => unknown,
    space?: string | number,
  ) => string,
): string {
  try {
    const stringify = stringifyArgs ?? JSON.stringify;
    return stringify(data, replacer, space);
  } catch {
    return defaultValue ?? '{}';
  }
}
