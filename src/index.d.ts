import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Suspendable<Data extends object> = Data;

type Fetcher<Data extends object, Input> = {
  run: (input: Input) => Suspendable<Data>;
};

type CreateFetcher = {
  <Data extends object, Input>(
    fetchFunc: (input: Input) => Promise<Data>,
  ): Fetcher<Data, Input>;
  <Data extends object, Input, TransformedInput>(
    fetchFunc: (input: TransformedInput) => Promise<Data>,
    transformFunc: (input: Input) => TransformedInput,
  ): Fetcher<Data, Input>;
};

export const createFetcher: CreateFetcher;

export const useFetcher: <Data extends object, Input>(
  fetcher: Fetcher<Data, Input>,
  initialSuspendable?: Suspendable<Data>,
) => {
  data: Data;
  refetch: (input: Input) => void;
};
