import { useCallback, useEffect, useState } from 'react';

import { FetchStore } from './createFetchStore';

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const [data, refetch] = useFetch(store);
 */
export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
  initialInput: Input,
) {
  const [state, setState] = useState(() => ({
    input: initialInput,
    result: store.getResult(initialInput),
  }));
  const { input, result } = state;
  useEffect(() => {
    const callback = () => {
      setState(() => ({
        input,
        result: store.getResult(input),
      }));
    };
    const unsubscribe = store.subscribe(input, callback);
    callback();
    return unsubscribe;
  }, [store, input]);
  const refetch = useCallback((nextInput: Input) => {
    store.prefetch(nextInput);
    setState(() => ({
      input: nextInput,
      result: store.getResult(nextInput),
    }));
  }, [store]);
  return [result, refetch] as const;
}
