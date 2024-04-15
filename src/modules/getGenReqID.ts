import type { RawRequestDefaultExpression, RawServerBase, RawServerDefault } from 'fastify';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export function getGenReqID(key: string, generatorParam?: () => string) {
  const generator = generatorParam ?? randomUUID;
  const handler = <T extends RawServerBase = RawServerDefault>(
    req: Pick<RawRequestDefaultExpression<T>, 'url'>,
  ) => {
    try {
      if (req.url == null) {
        return generator();
      }

      const url = req.url.startsWith('http')
        ? req.url
        : path.posix.join('http://localhost', req.url);
      const id = new URL(url).searchParams.get(key);
      return id ?? generator();
    } catch {
      return generator();
    }
  };

  return handler;
}
