import { describe, expect, it, vitest } from 'vitest';

import { safeStringify } from '#/stringify/safeStringify';

describe('safeStringify', () => {
  it('plain object', () => {
    const r01 = safeStringify({ name: 'ironman' });
    expect(r01).toEqual(`{"name":"ironman"}`);
  });

  it('invalid object', () => {
    const spyH = vitest.spyOn(JSON, 'stringify').mockImplementation(() => {
      throw new Error('error');
    });

    const r01 = safeStringify({ name: 'ironman' });
    const r02 = safeStringify(
      { name: 'ironman' },
      undefined,
      undefined,
      `{"error":"invalid object"}`,
    );

    spyH.mockRestore();

    expect(r01).toEqual('{}');
    expect(r02).toEqual(`{"error":"invalid object"}`);
  });

  it('custom stringify', () => {
    const r01 = safeStringify({ name: 'ironman' }, undefined, undefined, undefined, JSON.stringify);
    expect(r01).toEqual(`{"name":"ironman"}`);
  });

  it('replace, space', () => {
    const r01 = safeStringify({ name: 'ironman' }, (_k, v) => v, 2);
    expect(r01).toEqual(`{\n  "name": "ironman"\n}`);
  });
});
