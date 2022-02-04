import { useCallback, useState } from 'react';

import { FetchStore } from './createFetch';

type Refetch<Input> = (input: Input) => void;

export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
): [undefined, Refetch<Input>];

export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
  initialInput: Input,
): [Result, Refetch<Input>];

export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
  initialInput?: Input,
): [Result | undefined, Refetch<Input>];

/**
 * useFetch hook
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const [result, refetch] = useFetch(store, initialInput);
 */
export function useFetch<Result, Input>(
  store: FetchStore<Result, Input>,
  initialInput?: Input,
) {
  const [result, setResult] = useState(() => {
    if (initialInput === undefined) return undefined;
    return store.getResult(initialInput);
  });
  const refetch = useCallback((nextInput: Input) => {
    store.prefetch(nextInput);
    setResult(() => store.getResult(nextInput));
  }, [store]);
  return [result, refetch];
}
