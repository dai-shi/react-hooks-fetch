import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  prefetch,
  refetch as refetchSuspendable,
  Suspendable,
} from 'react-suspense-fetch';

/**
 * useFetch hook for React Suspense
 *
 * @example
 * import { prefetch, useFetch } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => {
 *   const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`);
 *   return res.json();
 * };
 *
 * const suspendable = prefetch(fetchFunc, '1');
 *
 * const Component = () => {
 *   const { result, refetch } = useFetch(suspendable);
 *   // ...
 * };
 */
export const useFetch = <Result extends object, Input>(
  suspendable: Suspendable<Result, Input>,
) => {
  if (suspendable !== useRef(suspendable).current) {
    throw new Error('suspendable has to be prefetched outside render');
  }
  const [result, setResult] = useState<Result>(suspendable);
  const refetch = useCallback((input: Input) => {
    setResult(refetchSuspendable(suspendable, input));
  }, [suspendable]);
  return { result, refetch };
};


type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;

/**
 * useFetch hook for React Suspense without prefetch
 *
 * @example
 * import { useFetchWithoutPrefetch } from 'react-hooks-fetch';
 *
 * const fetchFunc = async (userId) => {
 *   const res = await fetch(`https://reqres.in/api/users/${userId}?delay=3`);
 *   return res.json();
 * };
 *
 * const Component = ({ initialInput }) => {
 *   const { result, refetch } = useFetchWithoutPrefetch(fetchFunc, initialInput);
 *   // ...
 * };
 */
export const useFetchWithoutPrefetch = <Result extends object, Input>(
  fetchFunc: FetchFunc<Result, Input>,
  initialInput?: Input,
) => {
  if (fetchFunc !== useRef(fetchFunc).current) {
    throw new Error('fetchFunc has to be defined outside render');
  }
  const [result, setResult] = useState<Result | null>(null);
  useEffect(() => {
    if (initialInput !== undefined) {
      setResult(prefetch(fetchFunc, initialInput));
    }
  }, [fetchFunc, initialInput]);
  const refetch = useCallback((input: Input) => {
    setResult(prefetch(fetchFunc, input));
  }, [fetchFunc]);
  return { result, refetch };
};
