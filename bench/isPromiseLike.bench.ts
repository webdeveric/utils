import { bench } from 'vitest';

import { isFunction } from '../src/predicate/isFunction.js';
import { isObjectWith } from '../src/predicate/isObjectWith.js';
import { isPromiseLike } from '../src/predicate/isPromiseLike.js';

function isPromiseLike2<T>(input: unknown): input is PromiseLike<T> {
  return isObjectWith(input, 'then') && isFunction(input.then) && input.then.length === 2;
}

const resolvedPromise = Promise.resolve();

const promiseLikeObject = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  then(_onfulfilled: unknown, _onrejected: unknown): void {
    // noop
  },
};

bench('isPromiseLike()', () => {
  isPromiseLike(resolvedPromise);
  isPromiseLike(promiseLikeObject);
});

bench('isPromiseLike2()', () => {
  isPromiseLike2(resolvedPromise);
  isPromiseLike2(promiseLikeObject);
});
