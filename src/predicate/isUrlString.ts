export const isUrlString = (input: unknown): input is string => {
  return typeof input === 'string' && URL.canParse(input);
};
