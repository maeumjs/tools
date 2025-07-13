import { describe, it } from 'vitest';

import { noop } from '#/modules/noop';

describe('noop', () => {
  it('pass', () => {
    noop();
  });
});
