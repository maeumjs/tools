import type { Encryptioner } from '#/encrypts/Encryptioner';
import type { ENCRYPTIONER_SYMBOL_KEY } from '#/encrypts/ENCRYPTIONER_SYMBOL_KEY';

export interface IClassContainer {
  register<T>(name: string | symbol, registration: T): this;
  resolve<K>(name: string | symbol): K;
  resolve(name: typeof ENCRYPTIONER_SYMBOL_KEY): Encryptioner;
}
