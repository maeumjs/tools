# @maeum/tools

![ts](https://flat.badgen.net/badge/Built%20With/TypeScript/blue)
[![Download Status](https://img.shields.io/npm/dw/@maeum/tools.svg?style=flat-square)](https://npmcharts.com/compare/@maeum/tools)
[![Github Star](https://img.shields.io/github/stars/maeumjs/tools.svg?style=flat-square)](https://github.com/maeumjs/tools)
[![Github Issues](https://img.shields.io/github/issues-raw/maeumjs/tools.svg?style=flat-square)](https://github.com/maeumjs/tools/issues)
[![NPM version](https://img.shields.io/npm/v/@maeum/tools.svg?style=flat-square)](https://www.npmjs.com/package/@maeum/tools)
[![@maeum/tools](https://github.com/maeumjs/tools/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/maeumjs/tools/actions/workflows/ci.yml)
[![License](https://img.shields.io/npm/l/@maeum/tools.svg?style=flat-square)](https://github.com/maeumjs/tools/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/imjuni/tools/branch/master/graph/badge.svg?token=cYJEAvZUFU)](https://codecov.io/gh/maeum/tools)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

The `@maeum/tools` is a collection of useful functions for writing APT servers.

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
  - [installation](#installation)
- [Feature](#feature)
  - [Encryptioner](#encryptioner)
    - [Encryptioner options overview](#encryptioner-options-overview)
    - [DI](#di)
  - [Functions](#functions)

## Getting Started

### installation

```bash
npm install @maeum/tools --save
```

## Feature

### Encryptioner

Class to help with `AES-256-CBC` encryption and decryption. You can use it when writing server code to encrypt the location of an error in the response results. Certain countries may prohibit exposing the location of these errors in the response results. For example, in South Korea, sites with more than a certain number of users are not allowed to expose the location of errors to the public internet. EncryptContainer can be used to encrypt the error response location in such cases.

```ts
const encryptioner = new Encryptioner(getEncryptionerOptions());

const err = new Error('i am error raised your specific source code');

// You can use the encrypted value in logs or API responses
const encrypted = encryptioner.encrypt(
  JSON.stringify({ message: err.message, stack: err.stack }),
);
const decrypted = encryptioner.encrypt(encrypted);
```

#### Encryptioner options overview

| Property | Type     | Description                                                               |
| -------- | -------- | ------------------------------------------------------------------------- |
| `ivSize` | `number` | Specify the initialize vector size.                                       |
| `salt`   | `number` | Specifies the maximum size of the salt to make decryption more difficult. |
| `key`    | `string` | Specifies the encryption key.                                             |

#### DI

```ts
makeEncryptioner(container, { 
  ivSize: 16, 
  key: 'your key', 
  salt: 8,
});

const encryptioner = container.resolve(ENCRYPTIONER_SYMBOL_KEY);
const encrypted = encryptioner.encrypt(
  JSON.stringify({ message: err.message, stack: err.stack }),
);
const decrypted = encryptioner.encrypt(encrypted);
```

You can implement class container yourself.

```ts
class Container implements IClassContainer {
  #container: Record<string | symbol, unknown> = {};

  register<T>(name: string | symbol, registration: T): this {
    this.#container[name] = registration;
    return this;
  }

  resolve<K>(name: string | symbol): K {
    return this.#container[name] as K;
  }
}
```

Also you can use already DI package like that [awilix](https://github.com/jeffijoe/awilix)

```ts
class Container implements IClassContainer {
  #container: AwilixContainer = createContainer();

  register<T>(name: string | symbol, registration: T): this {
    this.#container.register(name, asValue(registration));
    return this;
  }

  resolve<K>(name: string | symbol): K {
    return this.#container.resolve(name) as K;
  }
}
```

### Functions

| name          | Description                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| noop          | noop function                                                                                                                                          |
| escape        | Use to remove newline characters when logging log record                                                                                     |
| safeStringify | If an exception is thrown when using the JSON.stringify function, execution will stop. safeStringify will return the value passed as defaultValue if an exception is thrown. |
| objectify     | Returns only those fields from the input object that conform to the JSON specification                                                                                    |
