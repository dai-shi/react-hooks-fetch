import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Suspendable<Data, Input> = {
  data: Data;
  refetch: (input: Input) => Suspendable<Data, Input>;
};

export const prefetch: <Data, Input>(
  fetchFunc: (input: Input) => Promise<Data>,
  initialInput: Input
) => Suspendable<Data, Input>;

export const lazyFetch: <Data, Input>(
  fetchFunc: (input: Input) => Promise<Data>,
  initialData: Data
) => Suspendable<Data, Input>;

export const useSuspendableFetch: <Data, Input>(
  initialFetch: Suspendable<Data, Input>
) => Suspendable<Data, Input>;
