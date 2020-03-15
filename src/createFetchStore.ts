type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

export type FetchStore<Result, Input> = {
  prefetch: (input: Input) => void;
  evict: (input: Input) => void;
  getResult: (input: Input) => Result;
};

const isObject = (x: unknown): x is object => typeof x === 'object' && x !== null;

/**
 * create fetch store
 *
 * @example
 * import { createFetchStore } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
 * const store = createFetchStore(fetchFunc);
 * store.prefetch('1');
 */
export function createFetchStore<Result, Input>(
  fetchFunc: FetchFunc<Result, Input>,
  preloaded?: { input: Input; result: Result }[],
) {
  type GetResult = () => Result;
  const cache = new Map<Input, GetResult>();
  const weakCache = new WeakMap<object, GetResult>();
  if (preloaded) {
    preloaded.forEach((item) => {
      if (isObject(item.input)) {
        weakCache.set(item.input, () => item.result);
      } else {
        cache.set(item.input, () => item.result);
      }
    });
  }
  const createGetResult = (input: Input) => {
    let promise: Promise<void> | null = null;
    let result: Result | null = null;
    let error: Error | null = null;
    promise = (async () => {
      try {
        result = await fetchFunc(input);
      } catch (e) {
        error = e;
      } finally {
        promise = null;
      }
    })();
    const getResult = () => {
      if (promise) throw promise;
      if (error !== null) throw error;
      return result as Result;
    };
    return getResult;
  };
  const prefetch = (input: Input) => {
    if (isObject(input)) {
      if (!weakCache.has(input)) {
        weakCache.set(input, createGetResult(input));
      }
      return;
    }
    if (!cache.has(input)) {
      cache.set(input, createGetResult(input));
    }
  };
  const evict = (input: Input) => {
    if (isObject(input)) {
      weakCache.delete(input);
    } else {
      cache.delete(input);
    }
  };
  const store: FetchStore<Result, Input> = {
    prefetch,
    evict,
    getResult: (input: Input) => {
      const getResult = isObject(input) ? weakCache.get(input) : cache.get(input);
      if (!getResult) throw new Error('call prefetch in advance');
      return getResult();
    },
  };
  return store;
}
