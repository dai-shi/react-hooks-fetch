import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Suspendable<Data, Input> = {
  data: Data;
  refetch: (input: Input) => Suspendable<Data, Input>;
  lazy?: boolean;
};

type Fetcher<Data, Input> = {
  prefetch: (input: Input) => Suspendable<Data, Input>;
  lazyFetch: (fallbackData: Data) => Suspendable<Data, Input>;
};

export const createFetcher: <Data, Input>(
  fetchFunc: (input: Input) => Promise<Data>,
) => Fetcher<Data, Input>;

export const useSuspendable: <Data, Input>(
  suspendable: Suspendable<Data, Input>
) => {
  data: Data;
  refetch: (input: Input) => void;
  lazy?: boolean;
};
