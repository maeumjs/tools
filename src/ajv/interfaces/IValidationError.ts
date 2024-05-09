export interface IValidationError {
  message: string;
  data?: unknown;
  schemaPath: string;
  params?: unknown;
}
