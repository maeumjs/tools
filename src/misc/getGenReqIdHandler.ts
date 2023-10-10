import type { FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

export default function getGenReqIdHandler(key: string, gen?: () => string) {
  const generator = gen ?? randomUUID;
  const genReqIdHandler = (req: Pick<FastifyRequest, 'url'>) => {
    try {
      const url = req.url.startsWith('http')
        ? req.url
        : path.posix.join('http://localhost', req.url);
      const id = new URL(url).searchParams.get(key);
      return id ?? generator();
    } catch {
      return generator();
    }
  };

  return genReqIdHandler;
}
