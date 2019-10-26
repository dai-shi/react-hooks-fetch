type Input<Data> = string | Request | (() => Promise<Data>);

export type CreateResource = <Data>(input: Input<Data>) => {
  data: Data;
};

export type CreateEmptyData = <Data>(emptyData: Data) => {
  data: Data;
};

export type UseResource = <Data>(
  initialResource: { data: Data }
) => {
  data: Data;
  refetch: (input: Input<Data>) => void;
};

export const createResource: CreateResource;
export const createEmptyData: CreateEmptyData;
export const useResource: UseResource;
