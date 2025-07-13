import crypto from 'node:crypto';

import { getRandomRangeInt } from 'my-easy-fp';

import { CE_ENCRYPTIONER_DEFAULT } from '#/encrypts/const-enum/CE_ENCRYPTIONER_DEFAULT';

import type { IEncryptionerOptions } from '#/encrypts/IEncryptionerOptions';

export class Encryptioner {
  #option: IEncryptionerOptions;

  #algorithm = 'aes-256-cbc';

  constructor(options: IEncryptionerOptions) {
    this.#option = options;
  }

  static getSaltSize(size?: number): number {
    if (size == null) {
      return CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT;
    }

    if (size > 1 && size <= CE_ENCRYPTIONER_DEFAULT.MAX_SALT) {
      return size;
    }

    return CE_ENCRYPTIONER_DEFAULT.DEFAULT_SALT;
  }

  static getOptions(nullable?: Partial<IEncryptionerOptions>): IEncryptionerOptions {
    const ivSize = nullable?.ivSize ?? CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE;
    const key =
      nullable?.key ??
      crypto
        .createHash('sha256')
        .update(process.cwd())
        .digest('base64')
        .substring(0, CE_ENCRYPTIONER_DEFAULT.DEFAULT_INITIALIZE_VECTOR_SIZE * 2);

    const salt = Encryptioner.getSaltSize(nullable?.salt);

    return { ivSize, key, salt };
  }

  getSalt(): string {
    const size = getRandomRangeInt(1, this.#option.salt);
    return crypto.randomBytes(size).toString('hex').substring(size);
  }

  encryptResultBuilder(iv: Buffer, encrypted: Buffer, cipher: crypto.Cipher): string {
    const ivPart = iv.toString('hex');
    const saltPart = this.getSalt();
    const encryptedPart = Buffer.concat([encrypted, cipher.final()]).toString('hex');
    const saltSize = Number.parseInt(`${saltPart.length}`, 16).toString();
    return `${saltPart}${ivPart}${encryptedPart}${saltSize}`;
  }

  // eslint-disable-next-line class-methods-use-this
  decryptResultBuilder(decrypted: Buffer, decipher: crypto.Decipher): string {
    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(this.#option.ivSize);
    const cipher = crypto.createCipheriv(this.#algorithm, Buffer.from(this.#option.key), iv);
    const encrypted = cipher.update(text);
    return this.encryptResultBuilder(iv, encrypted, cipher);
  }

  decrypt(text: string): string {
    const saltSizePart = Number.parseInt(text.substring(text.length - 1), 10);
    const ivWithSaltPart = text.substring(0, saltSizePart + this.#option.ivSize * 2);
    const ivPart = ivWithSaltPart.substring(saltSizePart);
    const bodyPart = text.substring(saltSizePart + this.#option.ivSize * 2, text.length - 1);

    const ivBuf = Buffer.from(ivPart, 'hex');
    const bodyBuf = Buffer.from(bodyPart, 'hex');

    const decipher = crypto.createDecipheriv(this.#algorithm, Buffer.from(this.#option.key), ivBuf);
    const decrypted = decipher.update(bodyBuf);

    return this.decryptResultBuilder(decrypted, decipher);
  }
}
