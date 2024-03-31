import { isBigInt } from './isBigInt.js';
import { isBoolean } from './isBoolean.js';
import { isNull } from './isNull.js';
import { isNumber } from './isNumber.js';
import { isString } from './isString.js';
import { isSymbol } from './isSymbol.js';
import { isUndefined } from './isUndefined.js';

import type { Primitive } from '../types/common.js';

export const isPrimitive = (input: unknown): input is Primitive =>
  isString(input) ||
  isNumber(input) ||
  isBigInt(input) ||
  isBoolean(input) ||
  isUndefined(input) ||
  isSymbol(input) ||
  isNull(input);
