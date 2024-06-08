import { CE_DI } from '#/di/CE_DI';
import type { IClassContainer } from '#/di/container';

import { Encryptioner } from '#/encrypts/Encryptioner';
import type { IEncryptionerOptions } from '#/encrypts/IEncryptionerOptions';
import { getEncryptionerOptions } from '#/encrypts/getEncryptionerOptions';

export function makeEncryptioner(
  container: IClassContainer,
  nullable?: Partial<IEncryptionerOptions>,
) {
  const options = getEncryptionerOptions(nullable);
  const encryptioner = new Encryptioner(options);

  container.register(CE_DI.ENCRYPTIONER, encryptioner);
  return encryptioner;
}
