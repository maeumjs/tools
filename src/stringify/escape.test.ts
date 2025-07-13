import { escape } from '#/stringify/escape';
import { describe, expect, it } from 'vitest';

describe('escape', () => {
  it('add backslash', () => {
    const r01 = escape('test\ntest');
    expect(r01).toEqual('test\\\ntest');
  });

  it('replace another charactor', () => {
    const r01 = escape('test\ntest', '1');
    expect(r01).toEqual('test1test');
  });
});
