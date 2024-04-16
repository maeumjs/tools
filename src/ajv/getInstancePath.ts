export function getInstancePath(instancePath?: string): string {
  if (instancePath == null || instancePath === '') {
    return '.';
  }

  return instancePath;
}
