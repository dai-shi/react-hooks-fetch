declare type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;
export declare type FetchStore<Result, Input> = {
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
export declare function createFetchStore<Result, Input>(fetchFunc: FetchFunc<Result, Input>, preloaded?: {
    input: Input;
    result: Result;
}[]): FetchStore<Result, Input>;
export {};
