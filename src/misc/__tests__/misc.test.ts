import getCwd from '#/misc/getCwd';
import noop from '#/misc/noop';
import { describe, expect, it } from '@jest/globals';

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
