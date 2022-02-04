type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

export type FetchStore<Result, Input> = {
  prefetch: (input: Input) => void;
  evict: (input: Input) => void;
  getResult: (input: Input) => Result;
};

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
  areEqual?: (a: Input, b: Input) => boolean,
) {
  type GetResult = () => Result;
  const cache = new Map<Input, GetResult>();
  const setCache = (input: Input, getResult: GetResult) => {
    if (areEqual) {
      for (const key of cache.keys()) {
        if (areEqual(key, input)) {
          return false;
        }
      }
    } else if (cache.has(input)) {
      return false;
    }
    cache.set(input, getResult);
    return true;
  };
  const getCache = (input: Input) => {
    if (areEqual) {
      for (const [key, value] of cache) {
        if (areEqual(key, input)) {
          return value;
        }
      }
      return undefined;
    }
    return cache.get(input);
  };
  const deleteCache = (input: Input) => {
    if (areEqual) {
      for (const key of cache.keys()) {
        if (areEqual(key, input)) {
          cache.delete(key);
          return true;
        }
      }
      return false;
    }
    return cache.delete(input);
  };
  if (preloaded) {
    preloaded.forEach((item) => {
      setCache(item.input, () => item.result);
    });
  }
  const createGetResult = (input: Input) => {
    let promise: Promise<void> | null = null;
    let result: Result | null = null;
    let error: unknown | null = null;
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
    setCache(input, createGetResult(input));
  };
  const evict = (input: Input) => {
    deleteCache(input);
  };
  const store: FetchStore<Result, Input> = {
    prefetch,
    evict,
    getResult: (input: Input) => {
      const getResult = getCache(input);
      if (!getResult) throw new Error('call prefetch in advance');
      return getResult();
    },
  };
  return store;
}
