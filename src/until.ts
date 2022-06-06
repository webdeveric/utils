import type { AnyRecord } from './types';
import { getType } from './getType.js';

export interface UntilContext {
  callCount: number;
  lastCall: number | undefined;
  data: AnyRecord;
  options: UntilOptions;
}

export type DelayFn = (context: Readonly<UntilContext>) => number;

export type Delay = DelayFn | number;

export type UntilOptions = {
  delay: Delay;
  timeout?: Delay;
  callLimit?: number;
};

export type ResolverValue<T> = T | PromiseLike<T>;

export type ResolveFn<T> = (value: ResolverValue<T>) => void;

export type RejectFn = (error?: Error) => void;

export type UntilCallback<T> = (resolve: ResolveFn<T>, reject: RejectFn, context: Readonly<UntilContext>) => void;

const defaultOptions: Readonly<UntilOptions> = {
  delay: 10,
};

export const isDelay = (input: unknown): input is Delay => Number.isInteger(input) || typeof input === 'function';

/**
 * Return a Promise that delegates resolving/rejecting to the passed in function.
 */
export function until<T>(fn: UntilCallback<T>, options: UntilOptions = defaultOptions): Promise<T> {
  if (typeof fn !== 'function') {
    return Promise.reject(new Error('fn must be a function'));
  }

  if (!options || typeof options !== 'object') {
    return Promise.reject(new TypeError(`options must be an object. ${getType(options)} provided.`));
  }

  const { delay, timeout, callLimit } = Object.assign({}, defaultOptions, options);

  const getDelay = (delay: Delay, context: UntilContext): number =>
    typeof delay === 'function' ? delay(context) : delay;

  if (!isDelay(delay)) {
    return Promise.reject(new TypeError('invalid delay value'));
  }

  if (timeout !== undefined && !isDelay(timeout)) {
    return Promise.reject(new TypeError('invalid timeout value'));
  }

  if (callLimit !== undefined && !Number.isInteger(callLimit)) {
    return Promise.reject(new TypeError('invalid callLimit value'));
  }

  return new Promise<T>((resolutionFn: ResolveFn<T>, rejectionFn: RejectFn) => {
    let callCount = 0;
    let lastCall: number | undefined;
    let done = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeoutTimer: any;

    const finish = (): void => {
      done = true;
      clearTimeout(timer);
      clearTimeout(timeoutTimer);
    };

    const resolve: ResolveFn<T> = (value: ResolverValue<T>): void => {
      resolutionFn(value);
      finish();
    };

    const reject: RejectFn = (error?: Error): void => {
      rejectionFn(error);
      finish();
    };

    const context: Readonly<UntilContext> = Object.freeze({
      get callCount() {
        return callCount;
      },
      get lastCall() {
        return lastCall;
      },
      get options() {
        return options;
      },
      data: {},
    });

    const callUntilDone = (fn: UntilCallback<T>, delay: Delay, resolve: ResolveFn<T>, reject: RejectFn): void => {
      try {
        if (callLimit && callCount >= callLimit) {
          throw new Error(`until callLimit reached: ${callLimit}`);
        }

        ++callCount;

        fn(resolve, reject, context);

        lastCall = Date.now();

        if (!done) {
          timer = setTimeout(callUntilDone, getDelay(delay, context), fn, delay, resolve, reject);
        }
      } catch (error) {
        reject(error instanceof Error ? error : new Error(`${error}`));
      }
    };

    callUntilDone(fn, delay, resolve, reject);

    if (!done && timeout !== undefined) {
      timeoutTimer = setTimeout(() => {
        reject(new Error('until: timed out'));
      }, getDelay(timeout, context));
    }
  });
}
