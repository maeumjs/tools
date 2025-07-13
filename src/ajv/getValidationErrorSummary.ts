import { getInstancePath } from '#/ajv/getInstancePath';

import type { ErrorObject } from 'ajv';

import type { TValidationErrors } from '#/ajv/interfaces/IValidationErrors';

export function getValidationErrorSummary(
  errors: (
    | Pick<ErrorObject, 'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'>
    | undefined
  )[],
): TValidationErrors {
  return errors
    .filter(
      (
        error,
      ): error is Pick<
        ErrorObject,
        'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'
      > => error != null,
    )
    .map((error) => ({
      message: error.message ?? 'validation error occured',
      instancePath: getInstancePath(error.instancePath),
      data: error.data,
      schemaPath: error.schemaPath,
      params: error.params,
    }))
    .reduce<TValidationErrors>(
      (aggregation, error) => ({
        ...aggregation,
        [error.instancePath]: {
          ...aggregation[error.instancePath],
          [error.schemaPath]: error,
        },
      }),
      {},
    );
}
