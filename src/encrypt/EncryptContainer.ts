import type IEncryptContinerOption from '#/encrypt/IEncryptContinerOption';
import { getRandomRangeInt } from 'my-easy-fp';
import crypto from 'node:crypto';

export default class EncryptContiner {
  static #it: EncryptContiner;

  static #isBootstrap: boolean = false;

  static MAX_SALT = 16;

  static DEFAULT_SALT = 8;

  static DEFAULT_INITIALIZE_VECTOR_SIZE = 16;

  static get it(): EncryptContiner {
    return EncryptContiner.#it;
  }

  static get isBootstrap(): boolean {
    return EncryptContiner.#isBootstrap;
  }

  static getSaltSize(size?: number) {
    if (size == null) {
      return EncryptContiner.DEFAULT_SALT;
    }

    if (size > 1 && size < EncryptContiner.MAX_SALT) {
      return size;
    }

    return EncryptContiner.DEFAULT_SALT;
  }

  static getOption(nullable?: Partial<IEncryptContinerOption>) {
    const ivSize = nullable?.ivSize ?? EncryptContiner.DEFAULT_INITIALIZE_VECTOR_SIZE;
    const key = nullable?.key ?? 'fb63f6de1233492a93b8df9eea402caa';
    const salt = EncryptContiner.getSaltSize(nullable?.salt);

    return { ivSize, key, salt } satisfies IEncryptContinerOption;
  }

  static bootstrap(nullable?: Partial<IEncryptContinerOption>) {
    const option = EncryptContiner.getOption(nullable);
    EncryptContiner.#it = new EncryptContiner(option);
    EncryptContiner.#isBootstrap = true;
  }

  #option: IEncryptContinerOption;

  #algorithm = 'aes-256-cbc';

  constructor(option: IEncryptContinerOption) {
    this.#option = option;
  }

  getSalt() {
    const size = getRandomRangeInt(1, this.#option.salt);
    return crypto.randomBytes(size).toString('hex').substring(size);
  }

  encryptResultBuilder(iv: Buffer, encrypted: Buffer, cipher: crypto.Cipher) {
    const ivPart = iv.toString('hex');
    const saltPart = this.getSalt();
    const encryptedPart = Buffer.concat([encrypted, cipher.final()]).toString('hex');
    const saltSize = Number.parseInt(`${saltPart.length}`, 16).toString();
    return `${saltPart}${ivPart}${encryptedPart}${saltSize}`;
  }

  decryptResultBuilder(decrypted: Buffer, decipher: crypto.Decipher) {
    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  encrypt(text: string) {
    const iv = crypto.randomBytes(this.#option.ivSize);
    const cipher = crypto.createCipheriv(this.#algorithm, Buffer.from(this.#option.key), iv);
    const encrypted = cipher.update(text);
    return this.encryptResultBuilder(iv, encrypted, cipher);
  }

  decrypt(text: string) {
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
