import type { Primitive } from '../types/common.js';

export const isPrimitive = (input: unknown): input is Primitive =>
  input === null ||
  typeof input === 'string' ||
  typeof input === 'number' ||
  typeof input === 'bigint' ||
  typeof input === 'boolean' ||
  typeof input === 'undefined' ||
  typeof input === 'symbol';
