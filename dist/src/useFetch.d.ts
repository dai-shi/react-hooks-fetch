import { FetchStore } from './createFetchStore';
declare type Refetch<Input> = (input: Input) => void;
export declare function useFetch<Result, Input>(store: FetchStore<Result, Input>): [undefined, Refetch<Input>];
export declare function useFetch<Result, Input>(store: FetchStore<Result, Input>, initialInput: Input): [Result, Refetch<Input>];
export declare function useFetch<Result, Input>(store: FetchStore<Result, Input>, initialInput?: Input): [Result | undefined, Refetch<Input>];
export {};
