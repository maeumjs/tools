import type { IEncryptionerOptions } from '#/encrypts/IEncryptionerOptions';
import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';
import { getEncryptionerSaltSize } from '#/encrypts/getEncryptionerSaltSize';
import crypto from 'node:crypto';

export function getEncryptionerOptions(nullable?: Partial<IEncryptionerOptions>) {
  const ivSize = nullable?.ivSize ?? CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE;
  const key =
    nullable?.key ??
    crypto
      .createHash('sha256')
      .update(process.cwd())
      .digest('base64')
      .substring(0, CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE * 2);
  const salt = getEncryptionerSaltSize(nullable?.salt);

  return { ivSize, key, salt } satisfies IEncryptionerOptions;
}
