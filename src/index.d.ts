// eslint-disable-next-line import/no-extraneous-dependencies
import { Body, Request, RequestInit } from 'node-fetch';

type Opts<Data> = RequestInit & {
  bodyReader?: (b: Body) => Promise<Data>;
  noSuspense?: boolean;
};

export type UseFetch = <Data>(input: string | Request, opts?: Opts<Data>) => {
  error: Error | null;
  loading?: boolean; // only used if noSuspense is true
  data: Data | null;
  abort: () => void;
};

export const useFetch: UseFetch;
