import type { IEncryptContinerOptions } from '#/encrypts/IEncryptContinerOptions';
import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';
import { getEncryptionerSaltSize } from '#/encrypts/getEncryptionerSaltSize';

export function getEncryptionerOptions(nullable?: Partial<IEncryptContinerOptions>) {
  const ivSize = nullable?.ivSize ?? CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE;
  const key = nullable?.key ?? 'fb63f6de1233492a93b8df9eea402caa';
  const salt = getEncryptionerSaltSize(nullable?.salt);

  return { ivSize, key, salt } satisfies IEncryptContinerOptions;
}
