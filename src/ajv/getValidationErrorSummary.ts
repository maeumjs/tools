import type { ErrorObject } from 'ajv';

export interface IValidationErrorSummary {
  [key: string]: { message: string; data?: unknown; schemaPath: string; params?: unknown };
}

export default function getValidationErrorSummary(
  errors: (
    | Pick<ErrorObject, 'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'>
    | undefined
  )[],
): IValidationErrorSummary {
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
      instancePath: error.instancePath,
      data: error.data,
      schemaPath: error.schemaPath,
      params: error.params,
    }))
    .reduce<IValidationErrorSummary>((aggregation, error) => {
      return { ...aggregation, [error.instancePath]: error };
    }, {});
}
