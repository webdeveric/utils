export const isSizeAware = (input: unknown): input is { size: number } =>
  input !== null && typeof input === 'object' && 'size' in input && typeof input.size === 'number';
