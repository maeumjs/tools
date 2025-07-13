import { getCwd } from '#/modules/getCwd';
import { describe, expect, it } from 'vitest';

describe('getCwd', () => {
  it('normal situation', () => {
    const r01 = getCwd({ INIT_CWD: 'maeum-path' });
    const r02 = getCwd();

    expect(r01).toEqual('maeum-path');
    expect(r02).toEqual(process.cwd());
  });
});
