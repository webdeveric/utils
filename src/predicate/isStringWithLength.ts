export const isStringWithLength = (input: unknown): input is string => typeof input === 'string' && input.length > 0;
