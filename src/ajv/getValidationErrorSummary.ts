import { getInstancePath } from '#/ajv/getInstancePath';
import type { IValidationErrors } from '#/ajv/interfaces/IValidationErrors';
import type { ErrorObject } from 'ajv';

export function getValidationErrorSummary(
  errors: (
    | Pick<ErrorObject, 'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'>
    | undefined
  )[],
): IValidationErrors {
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
    .reduce<IValidationErrors>((aggregation, error) => {
      return {
        ...aggregation,
        [error.instancePath]: {
          ...aggregation[error.instancePath],
          [error.schemaPath]: error,
        },
      };
    }, {});
}
