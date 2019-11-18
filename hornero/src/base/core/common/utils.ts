/** Returns whether the value is a function. Acts as a type guard. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFunction(value: any): value is Function {
  return typeof value === "function";
}

/**
 * Safely invoke the function with the given arguments, if it is indeed a
 * function, and return its value. Otherwise, return undefined.
 */
export function safeInvoke<R>(func: (() => R) | undefined): R | undefined;
export function safeInvoke<A, R>(func: ((arg1: A) => R) | undefined, arg1: A): R | undefined;
export function safeInvoke<A, B, R>(func: ((arg1: A, arg2: B) => R) | undefined, arg1: A, arg2: B): R | undefined;
export function safeInvoke<A, B, C, R>(
  func: ((arg1: A, arg2: B, arg3: C) => R) | undefined,
  arg1: A,
  arg2: B,
  arg3: C,
): R | undefined;
export function safeInvoke<A, B, C, D, R>(
  func: ((arg1: A, arg2: B, arg3: C, arg4: D) => R) | undefined,
  arg1: A,
  arg2: B,
  arg3: C,
  arg4: D,
): R | undefined;
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-function-return-type
export function safeInvoke(func: Function | undefined, ...args: any[]) {
  if (isFunction(func)) {
    return func(...args);
  }
  return undefined;
}
