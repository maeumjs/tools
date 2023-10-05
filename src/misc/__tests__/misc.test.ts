import noop from '#/misc/noop';
import { describe, it } from '@jest/globals';

describe('noop', () => {
  it('pass', () => {
    noop();
  });
});
