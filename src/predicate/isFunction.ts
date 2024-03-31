import type { AnyFunction } from '../types/common.js';

export const isFunction = <Func extends AnyFunction = AnyFunction>(input: unknown): input is Func =>
  typeof input === 'function';
