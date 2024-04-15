export interface IClassContainer {
  register<T>(name: string | symbol, registration: T): IClassContainer;
  resolve<K>(name: string | symbol): K;
}
