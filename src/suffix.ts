import type { Primitive } from './types/common.js';

export const suffix = (suffixString: string, value: Exclude<Primitive, symbol>, defaultValue = ''): string => {
  if (value == null || (typeof value == 'string' && value.length === 0)) {
    return defaultValue;
  }

  return `${value}${suffixString}`;
};
