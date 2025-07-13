import { describe, expect, it, vitest } from 'vitest';

import { objectify } from '#/stringify/objectify';

describe('objectify', () => {
  it('function termination', () => {
    const r01 = objectify({ name: 'ironman', f: (name: string) => `${name}:hello?` });
    expect(r01).toMatchObject({ name: 'ironman' });
  });

  it('exception', () => {
    const err = new Error('error');
    const spyH = vitest.spyOn(JSON, 'stringify').mockImplementationOnce(() => {
      throw err;
    });
    const r01 = objectify({ name: 'ironman', f: (name: string) => `${name}:hello?` });
    spyH.mockRestore();
    expect(r01).toEqual({ err });
  });
});
