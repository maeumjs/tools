import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';
import { Encryptioner } from '#/encrypts/Encryptioner';
import crypto from 'node:crypto';
import { describe, expect, it } from 'vitest';

describe('EncryptContiner', () => {
  it('getEncryptionerSaltSize', () => {
    const r01 = Encryptioner.getSaltSize();
    const r02 = Encryptioner.getSaltSize(10);
    const r03 = Encryptioner.getSaltSize(20);
    const r04 = Encryptioner.getSaltSize(1);

    expect(r01).toEqual(8);
    expect(r02).toEqual(10);
    expect(r03).toEqual(8);
    expect(r04).toEqual(8);
  });

  it('default option created', () => {
    const key = crypto
      .createHash('sha256')
      .update(process.cwd())
      .digest('base64')
      .substring(0, CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE * 2);
    const options = Encryptioner.getOptions();

    expect(options).toMatchObject({
      ivSize: CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE,
      key,
      salt: CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT,
    });
  });

  it('default option created', () => {
    const options = Encryptioner.getOptions({
      ivSize: 1,
      key: '12345678901234567890123456789012',
      salt: 2,
    });

    expect(options).toMatchObject({
      ivSize: 1,
      key: '12345678901234567890123456789012',
      salt: 2,
    });
  });

  it('encrypt and decrypt', () => {
    const encryptioner = new Encryptioner(Encryptioner.getOptions());
    const r01 = encryptioner.encrypt('ironman');
    const r02 = encryptioner.decrypt(r01);

    expect(r01).toBeTruthy();
    expect(r02).toEqual('ironman');
  });
});
