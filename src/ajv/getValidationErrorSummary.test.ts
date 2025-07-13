import { getValidationErrorSummary } from '#/ajv/getValidationErrorSummary';
import type { ErrorObject } from 'ajv';
import { beforeAll, describe, expect, it } from 'vitest';

const context: {
  errors: Pick<ErrorObject, 'message' | 'instancePath' | 'data' | 'schemaPath' | 'params'>[];
} = {
  errors: [],
};

describe('getValidationErrorSummary', () => {
  beforeAll(() => {
    context.errors = [
      {
        message: '001-message',
        instancePath: '001-instancePath',
        data: '001-data',
        schemaPath: '001-schemaPath',
        params: { name: 'ironman' },
      },
      {
        message: '002-message',
        instancePath: '002-instancePath',
        data: '002-data',
        schemaPath: '002-schemaPath',
        params: { name: 'ironman' },
      },
      {
        message: undefined,
        instancePath: '003-instancePath',
        data: '003-data',
        schemaPath: '003-schemaPath',
        params: { name: 'ironman' },
      },
    ];
  });

  it('include undefined', () => {
    const obj = getValidationErrorSummary([
      context.errors.at(0),
      undefined,
      context.errors.at(1),
      context.errors.at(2),
    ]);
    expect(obj).toMatchObject({
      '001-instancePath': {
        '001-schemaPath': {
          message: '001-message',
          instancePath: '001-instancePath',
          data: '001-data',
          schemaPath: '001-schemaPath',
          params: { name: 'ironman' },
        },
      },
      '002-instancePath': {
        '002-schemaPath': {
          message: '002-message',
          instancePath: '002-instancePath',
          data: '002-data',
          schemaPath: '002-schemaPath',
          params: { name: 'ironman' },
        },
      },
      '003-instancePath': {
        '003-schemaPath': {
          message: 'validation error occured',
          instancePath: '003-instancePath',
          data: '003-data',
          schemaPath: '003-schemaPath',
          params: { name: 'ironman' },
        },
      },
    });
  });
});
