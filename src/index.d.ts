import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Suspendable<Data extends object> = Data;

type Fetcher<Data extends object, Input> = {
  prefetch: (input: Input) => Suspendable<Data>;
  initialSuspendable: Suspendable<Data>;
};

type CreateFetcher = {
  <Data extends object, Input>(
    fetchFunc: (input: Input) => Promise<Data>,
    fallbackData: null,
    initialInput: Input,
  ): Fetcher<Data, Input>;
  <Data extends object, Input>(
    fetchFunc: (input: Input) => Promise<Data>,
    fallbackData: Data,
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
