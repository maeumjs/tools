import { getInstancePath } from '#/ajv/getInstancePath';
import type { IValidationError } from '#/ajv/interfaces/IValidationError';
import type { ErrorObject } from 'ajv';

export function getValidationErrorMessage(
  errors: (
    | Pick<ErrorObject, 'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'>
    | undefined
  )[],
): (IValidationError & { instancePath: string })[] {
  return errors
    .filter(
      (
        error,
      ): error is Pick<
        ErrorObject,
        'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'
      > => error != null,
    )
    .map(
      (error) =>
        ({
          message: error.message ?? 'validation error occured',
          instancePath: getInstancePath(error.instancePath),
          data: error.data,
          schemaPath: error.schemaPath,
          params: error.params,
        }) satisfies IValidationError & { instancePath: string },
    );
}
