import { randomUUID } from 'node:crypto';
import path from 'node:path';

import type { RawRequestDefaultExpression, RawServerBase, RawServerDefault } from 'fastify';

export type TRequestIDHandler = <T extends RawServerBase = RawServerDefault>(
  req: Pick<RawRequestDefaultExpression<T>, 'url'>,
) => string;

export function getGenReqID(key: string, generatorParam?: () => string): TRequestIDHandler {
  const generator = generatorParam ?? randomUUID;
  const handler: TRequestIDHandler = <T extends RawServerBase = RawServerDefault>(
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
