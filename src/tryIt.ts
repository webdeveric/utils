import type { AnyFunction } from './types/common.js';

export function tryIt<Fn extends AnyFunction>(fn: Fn): ReturnType<Fn> | undefined;

export function tryIt<Fn extends AnyFunction, D>(fn: Fn, defaultValue: D): ReturnType<Fn> | D;

export function tryIt<Fn extends AnyFunction, D>(fn: Fn, defaultValue?: D): ReturnType<Fn> | D | undefined {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
