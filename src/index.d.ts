type Input<Data> = string | Request | (() => Promise<Data>);

export type CreateAsync = <Data>(input: Input<Data>) => {
  data: Data;
};

export type CreateStatic = <Data>(emptyData: Data) => {
  data: Data;
};

export type UseAsync = <Data>(
  initialResult: { data: Data }
) => {
  data: Data;
  refetch: (input: Input<Data>) => void;
};

export const createAsync: CreateAsync;
export const createStatic: CreateStatic;
export const useAsync: UseAsync;
