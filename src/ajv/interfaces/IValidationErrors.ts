import type { IValidationError } from '#/ajv/interfaces/IValidationError';

export interface IValidationErrors {
  [key: string]: {
    [key: string]: IValidationError;
  };
}
