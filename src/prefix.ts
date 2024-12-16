import type { Primitive } from './types/common.js';

export const prefix = (prefixString: string, value: Exclude<Primitive, symbol>, defaultValue = ''): string => {
  if (value == null || (typeof value == 'string' && value.length === 0)) {
    return defaultValue;
  }

  return `${prefixString}${value}`;
};
