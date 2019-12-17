 
declare type FetchFunc<Result, Input> = (input: Input) => Promise<Result>;
export declare const createUseFetch: <Result extends object, Input>(fetchFunc: FetchFunc<Result, Input>, initialInput: Input) => () => {
    result: Result;
    refetch: (input: any) => void;
};
export declare const createUseFetchWithoutPrefetch: <Result extends object, Input>(fetchFunc: FetchFunc<Result, Input>) => () => {
    result: Result | null;
    refetch: (input: any) => void;
};
export {};
