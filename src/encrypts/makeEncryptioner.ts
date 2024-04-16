import type { IClassContainer } from '#/declarations/container';
import { ENCRYPTIONER_SYMBOL_KEY } from '#/encrypts/ENCRYPTIONER_SYMBOL_KEY';
import { Encryptioner } from '#/encrypts/Encryptioner';
import type { IEncryptionerOptions } from '#/encrypts/IEncryptionerOptions';
import { getEncryptionerOptions } from '#/encrypts/getEncryptionerOptions';

export function makeEncryptioner(
  container: IClassContainer,
  nullable?: Partial<IEncryptionerOptions>,
) {
  const options = getEncryptionerOptions(nullable);
  const encryptioner = new Encryptioner(options);

  container.register(ENCRYPTIONER_SYMBOL_KEY, encryptioner);
  return encryptioner;
}
