import { asError } from './asError.js';

import type { AnyAsyncFunction, AnySyncFunction } from './types/common.js';

export type OkResult<T> = Readonly<{
  ok: T;
  isOk: true;
  isError: false;
}>;

export type ErrorResult<E> = Readonly<{
  error: E;
  isOk: false;
  isError: true;
}>;

export type Result<T, E> = OkResult<T> | ErrorResult<E>;

function okResult<T>(ok: T): OkResult<T> {
  return Object.freeze({
    ok,
    isOk: true,
    isError: false,
  });
}

function errorResult<E>(error: E): ErrorResult<E> {
  return Object.freeze({
    error,
    isOk: false,
    isError: true,
  });
}

export type ResultifiedSyncFn<Fn extends AnySyncFunction> = (...args: Parameters<Fn>) => Result<ReturnType<Fn>, Error>;

/**
 * Wrap a synchronous function `fn` so it returns a `Result` instead of throwing.
 *
 * @example
 * ```ts
 * const parse = resultify(JSON.parse);
 *
 * parse('{"a":1}'); // { ok: { a: 1 }, isOk: true, isError: false }
 * parse('invalid'); // { error: SyntaxError, isOk: false, isError: true }
 * ```
 */
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

/**
 * Wrap an async function `fn` so its returned `Promise` resolves with a `Result` instead of rejecting.
 *
 * @example
 * ```ts
 * const fetchJson = resultifyAsync(async (url: string) => {
 *   const response = await fetch(url);
 *
 *   return response.json();
 * });
 *
 * await fetchJson('https://example.com'); // { ok: ..., isOk: true, isError: false }
 * ```
 */
export const resultifyAsync =
  <Fn extends AnyAsyncFunction>(fn: Fn): ResultifiedAsyncFn<Fn> =>
  (...args) =>
    fn(...args).then(okResult, (error) => errorResult(asError(error)));
