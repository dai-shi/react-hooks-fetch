type Opts<Data> = RequestInit & {
  bodyReader?: (b: Body) => Promise<Data>;
};

type Falsy = false | 0 | '' | null | undefined;
export type UseFetch = <Data>(
  input: string | Request | Falsy,
  opts?: Opts<Data> | Falsy,
) => {
  error: Error | null;
  data: Data | null;
};

export const useFetch: UseFetch;
