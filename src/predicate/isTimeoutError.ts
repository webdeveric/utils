import type { TimeoutError } from '../types/errors.js';

export const isTimeoutError = (error: unknown): error is TimeoutError =>
  error instanceof DOMException && error.name === 'TimeoutError';
