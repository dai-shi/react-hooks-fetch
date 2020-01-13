import { Suspendable } from 'react-suspense-fetch';
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
export declare const useFetch: <Result extends object, Input>(suspendable: Suspendable<Result, Input>) => {
    result: Result;
    refetch: (input: Input) => void;
};
declare type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;
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
export declare const useFetchWithoutPrefetch: <Result extends object, Input>(fetchFunc: FetchFunc<Result, Input>, initialInput?: Input | undefined) => {
    result: Result | null;
    refetch: (input: Input) => void;
};
export {};
