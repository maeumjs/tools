import { describe, expect, it } from 'vitest';

import { getInstancePath } from '#/ajv/getInstancePath';

describe('getInstancePath', () => {
  it('nullable instance-path', () => {
    const r01 = getInstancePath();
    expect(r01).toEqual('.');
  });

  it('non-nullable instance-path', () => {
    const r01 = getInstancePath('11');
    expect(r01).toEqual('11');
  });
});
