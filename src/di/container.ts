import type { CE_DI } from '#/di/CE_DI';
import type { Encryptioner } from '#/encrypts/Encryptioner';

export interface IClassContainer {
  register<T>(name: string | symbol, registration: T): this;
  resolve<K>(name: string | symbol): K;
  resolve(name: typeof CE_DI.ENCRYPTIONER): Encryptioner;
}
