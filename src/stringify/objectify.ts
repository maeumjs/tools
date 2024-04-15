export function objectify(data: unknown): unknown {
  try {
    const stringified = JSON.stringify(data);
    return JSON.parse(stringified);
  } catch (err) {
    return { err };
  }
}
