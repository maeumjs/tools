import type { IValidationError } from '#/ajv/interfaces/IValidationError';

export type TValidationErrors = Record<string, Record<string, IValidationError>>;
