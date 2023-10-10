import getCwd from '#/misc/getCwd';
import getGenReqIdHandler from '#/misc/getGenReqIdHandler';
import noop from '#/misc/noop';
import { describe, expect, it, jest } from '@jest/globals';
import crypto from 'node:crypto';
import path from 'node:path';

describe('noop', () => {
  it('pass', () => {
    noop();
  });
});

describe('getCwd', () => {
  it('normal situation', () => {
    const r01 = getCwd({ INIT_CWD: 'maeum-path' });
    const r02 = getCwd();

    expect(r01).toEqual('maeum-path');
    expect(r02).toEqual(process.cwd());
  });
});

describe('getGenReqIdHandler', () => {
  it('without protocal and host', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const handle01 = getGenReqIdHandler('tid');
    const id = handle01({ url: `/super/hero?name=ironman&tid=${tid}` });

    expect(id).toEqual(tid);
  });

  it('without protocal and host', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const handle01 = getGenReqIdHandler('tid');
    const id = handle01({ url: `http://localhost/super/hero?name=ironman&tid=${tid}` });

    expect(id).toEqual(tid);
  });

  it('not found tid from querystring', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    jest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);

    const handle01 = getGenReqIdHandler('tid');
    const id = handle01({ url: `http://localhost/super/hero?name=ironman` });

    expect(id).toEqual(tid);
  });

  it('raise exception in function', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    jest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);
    jest.spyOn(path.posix, 'join').mockImplementationOnce(() => {
      throw new Error('error');
    });

    const handle01 = getGenReqIdHandler('tid');
    const id = handle01({ url: '/super/hero?name=ironman' });

    expect(id).toEqual(tid);
  });
});
