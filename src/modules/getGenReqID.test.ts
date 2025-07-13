import { getGenReqID } from '#/modules/getGenReqID';
import * as crypto from 'node:crypto';
import path from 'node:path';
import { describe, expect, it, vitest } from 'vitest';

vitest.mock('node:crypto', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('node:crypto')>();
  return { ...mod };
});

vitest.mock('node:path', async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const mod = await importOriginal<typeof import('node:path')>();
  return { ...mod };
});

describe('getGenReqIdHandler', () => {
  it('without protocal and host', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';
    const spyH = vitest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);

    const handle01 = getGenReqID('tid');
    const id = handle01({ url: `/super/hero?name=ironman&tid=${tid}` });

    spyH.mockRestore();

    expect(id).toEqual(tid);
  });

  it('without protocal and host', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const handle01 = getGenReqID('tid');
    const id = handle01({ url: `http://localhost/super/hero?name=ironman&tid=${tid}` });

    expect(id).toEqual(tid);
  });

  it('not found tid from querystring', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const spyH = vitest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);

    const handle01 = getGenReqID('tid');
    const id = handle01({ url: `http://localhost/super/hero?name=ironman` });

    spyH.mockRestore();

    expect(id).toEqual(tid);
  });

  it('undefined url', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const spyH = vitest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);

    const handle01 = getGenReqID('tid');
    const id = handle01({ url: undefined });

    spyH.mockRestore();

    expect(id).toEqual(tid);
  });

  it('raise exception in function', () => {
    const tid = '70cd9767-38ac-4bda-b07e-a606c1c54c0b';

    const spyH01 = vitest.spyOn(crypto, 'randomUUID').mockImplementationOnce(() => tid);

    const spyH02 = vitest.spyOn(path.posix, 'join').mockImplementationOnce(() => {
      throw new Error('error');
    });

    const handle01 = getGenReqID('tid');
    const id = handle01({ url: '/super/hero?name=ironman' });

    spyH01.mockRestore();
    spyH02.mockRestore();

    expect(id).toEqual(tid);
  });
});
