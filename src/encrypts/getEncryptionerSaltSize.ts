import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';

export function getEncryptionerSaltSize(size?: number) {
  if (size == null) {
    return CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT;
  }

  if (size > 1 && size < CE_ENCRYPTIONER_DEFAULT.MAX_SALT) {
    return size;
  }

  return CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT;
}
