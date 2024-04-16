export interface IEncryptionerOptions {
  /** specify the initialize vector size */
  ivSize: number;

  /** specifies the maximum size of the salt to make decryption more difficult  */
  salt: number;

  /** specifies the encryption key */
  key: string;
}
