export const isNumber = (input: unknown): input is number => typeof input === 'number' && !Number.isNaN(input);
