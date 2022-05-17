import { useCallback } from 'react';

import {
  FetchFunc,
  createFetchState,
  useFetchState,
  useSetFetchState,
} from './FetchProvider';

/**
 * useRefetch hook
 *
 * This returns only `refetch` part of what `useFetch` returns.
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const refetch = useRefetch(desc);
 * refetch('1');
 */
export function useRefetch<Input, Result>(
  fn: FetchFunc<Input, Result>,
) {
  const setFetchState = useSetFetchState(fn);
  const refetch = useCallback((input: Input) => {
    setFetchState(createFetchState(fn, input));
  }, [setFetchState, fn]);
  return refetch;
}

export function useFetch<Input, Result>(
  fn: FetchFunc<Input, Result>,
  options: { allowUndefined: true },
): {
  input: Input | undefined;
  result: Result | undefined;
  refetch: (input: Input) => void;
};

export function useFetch<Input, Result>(
  fn: FetchFunc<Input, Result>,
): {
  input: Input;
  result: Result;
  refetch: (input: Input) => void;
};

/**
 * useFetch hook
 *
 * This is the main hook to be used.
 *
 * @example
 * import { useFetch } from 'react-hooks-fetch';
 *
 * const { input, result, refetch } = useFetch(desc);
 */
export function useFetch<Input, Result>(
  fn: FetchFunc<Input, Result>,
  options?: { allowUndefined: boolean },
) {
  let state = useFetchState(fn);
  if (!state && options?.allowUndefined) {
    state = { input: undefined as unknown as Input };
  }
  if (!state) {
    throw new Error('missing initial input');
  }
  if ('promise' in state) {
    throw state.promise;
  }
  if ('error' in state) {
    throw state.error;
  }
  return {
    input: state.input,
    result: state.result as Result,
    refetch: useRefetch(fn),
  };
}
