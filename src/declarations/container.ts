export interface IClassContainer {
  register<T>(name: string | symbol, registration: T): this;
  resolve<K>(name: string | symbol): K;
}
