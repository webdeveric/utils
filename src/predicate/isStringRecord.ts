import { isObject } from './isObject.js';
import { isStringArray } from './isStringArray.js';

import type { StringRecord } from '../types/records.js';

export const isStringRecord = (input: unknown): input is StringRecord => {
  return isObject(input) && Object.entries(input).every(isStringArray);
};
