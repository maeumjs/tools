import escape from '#/stringify/escape';
import objectify from '#/stringify/objectify';
import safeStringify from '#/stringify/safeStringify';
import { describe, expect, it, jest } from '@jest/globals';

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

describe('safeStringify', () => {
  it('plain object', () => {
    const r01 = safeStringify({ name: 'ironman' });
    expect(r01).toEqual(`{"name":"ironman"}`);
  });

  it('invalid object', () => {
    const spyH = jest.spyOn(JSON, 'stringify').mockImplementation(() => {
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

describe('objectify', () => {
  it('function termination', () => {
    const r01 = objectify({ name: 'ironman', f: (name: string) => `${name}:hello?` });
    expect(r01).toMatchObject({ name: 'ironman' });
  });

  it('exception', () => {
    const err = new Error('error');
    const spyH = jest.spyOn(JSON, 'stringify').mockImplementationOnce(() => {
      throw err;
    });
    const r01 = objectify({ name: 'ironman', f: (name: string) => `${name}:hello?` });
    spyH.mockRestore();
    expect(r01).toEqual({ err });
  });
});
