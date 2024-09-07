import { asError } from './asError.js';

import type { AnyAsyncFunction, AnySyncFunction } from './types/common.js';

export type OkResult<T> = {
  ok: T;
};

export type ErrorResult<E> = {
  error: E;
};

export type Result<T, E> = OkResult<T> | ErrorResult<E>;

function okResult<T>(ok: T): OkResult<T> {
  return {
    ok,
  };
}

function errorResult<E>(error: E): ErrorResult<E> {
  return {
    error,
  };
}

export type ResultifiedSyncFn<Fn extends AnySyncFunction> = (...args: Parameters<Fn>) => Result<ReturnType<Fn>, Error>;

export function resultify<Fn extends AnySyncFunction>(fn: Fn): ResultifiedSyncFn<Fn> {
  return (...args) => {
    try {
      return okResult(fn(...args));
    } catch (error) {
      return errorResult(asError(error));
    }
  };
}

export type ResultifiedAsyncFn<Fn extends AnyAsyncFunction> = (
  ...args: Parameters<Fn>
) => Promise<Result<Awaited<ReturnType<Fn>>, Error>>;

export const resultifyAsync =
  <Fn extends AnyAsyncFunction>(fn: Fn): ResultifiedAsyncFn<Fn> =>
  (...args) =>
    fn(...args).then(okResult, (error) => errorResult(asError(error)));
