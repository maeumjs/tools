export function objectify<T = unknown>(data: unknown): T {
  try {
    const stringified = JSON.stringify(data);
    return JSON.parse(stringified) as T;
  } catch (err) {
    return { err } as T;
  }
}
