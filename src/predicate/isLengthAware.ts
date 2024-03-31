export const isLengthAware = (input: unknown): input is { length: number } =>
  input !== null && typeof input === 'object' && 'length' in input && typeof input.length === 'number';
