import { Encryptioner } from '#/encrypts/Encryptioner';
import { getEncryptionerOptions } from '#/encrypts/getEncryptionerOptions';
import { getEncryptionerSaltSize } from '#/encrypts/getEncryptionerSaltSize';
import { describe, expect, it } from '@jest/globals';

describe('getEncryptionerSaltSize', () => {
  it('getEncryptionerSaltSize', () => {
    const r01 = getEncryptionerSaltSize();
    const r02 = getEncryptionerSaltSize(10);
    const r03 = getEncryptionerSaltSize(20);
    const r04 = getEncryptionerSaltSize(1);

    expect(r01).toEqual(8);
    expect(r02).toEqual(10);
    expect(r03).toEqual(8);
    expect(r04).toEqual(8);
  });
});

describe('EncryptContiner', () => {
  it('encrypt', () => {
    const encryptioner = new Encryptioner(getEncryptionerOptions());
    const r01 = encryptioner.encrypt('ironman');
    const r02 = encryptioner.decrypt(r01);

    expect(r01).toBeTruthy();
    expect(r02).toEqual('ironman');
  });
});
