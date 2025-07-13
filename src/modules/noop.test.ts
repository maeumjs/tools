import { noop } from '#/modules/noop';
import { describe, it } from 'vitest';

describe('noop', () => {
  it('pass', () => {
    noop();
  });
});
