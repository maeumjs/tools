import EncryptContiner from '#/encrypt/EncryptContainer';
import { beforeAll, describe, expect, it } from '@jest/globals';

describe('EncryptContiner', () => {
  beforeAll(() => {
    EncryptContiner.bootstrap();
  });

  it('is-bootstrap', () => {
    expect(EncryptContiner.isBootstrap).toBeTruthy();
  });

  it('salt', () => {
    const r01 = EncryptContiner.getSaltSize();
    const r02 = EncryptContiner.getSaltSize(10);
    const r03 = EncryptContiner.getSaltSize(20);
    const r04 = EncryptContiner.getSaltSize(1);

    expect(r01).toEqual(8);
    expect(r02).toEqual(10);
    expect(r03).toEqual(8);
    expect(r04).toEqual(8);
  });

  it('encrypt', () => {
    const r01 = EncryptContiner.it.encrypt('ironman');
    const r02 = EncryptContiner.it.decrypt(r01);

    expect(r01).toBeTruthy();
    expect(r02).toEqual('ironman');
  });
});
