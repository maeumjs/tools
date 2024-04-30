import { IClassContainer } from '#/containers/container';
import { ENCRYPTIONER_SYMBOL_KEY } from '#/encrypts/ENCRYPTIONER_SYMBOL_KEY';
import { Encryptioner } from '#/encrypts/Encryptioner';
import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';
import { getEncryptionerOptions } from '#/encrypts/getEncryptionerOptions';
import { getEncryptionerSaltSize } from '#/encrypts/getEncryptionerSaltSize';
import { makeEncryptioner } from '#/encrypts/makeEncryptioner';
import crypto from 'node:crypto';
import { describe, expect, it } from 'vitest';

class Container implements IClassContainer {
  #container: Record<string | symbol, unknown> = {};

  register<T>(name: string | symbol, registration: T): this {
    this.#container[name] = registration;
    return this;
  }

  resolve<K>(name: string | symbol): K {
    return this.#container[name] as K;
  }
}

const container = new Container();

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

  it('makeEncryptioner', () => {
    makeEncryptioner(container);
    const encryptioner = container.resolve<Encryptioner>(ENCRYPTIONER_SYMBOL_KEY);
    expect(encryptioner).toBeInstanceOf(Encryptioner);
  });
});

describe('getEncryptionerOptions', () => {
  it('default option created', () => {
    const key = crypto
      .createHash('sha256')
      .update(process.cwd())
      .digest('base64')
      .substring(0, CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE * 2);
    const options = getEncryptionerOptions();

    expect(options).toMatchObject({
      ivSize: CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE,
      key,
      salt: CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT,
    });
  });

  it('default option created', () => {
    const options = getEncryptionerOptions({
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
});
