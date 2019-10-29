import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Suspendable<Data, Input> = {
  data: Data;
  refetch: (input: Input) => Suspendable<Data, Input>;
};

type Fetcher<Data, Input> = {
  prefetch: (input: Input) => Suspendable<Data, Input>;
  fallback: (initialData: Data) => Suspendable<Data, Input>;
};

export const createFetcher: <Data, Input>(
  fetchFunc: (input: Input) => Promise<Data>,
) => Fetcher<Data, Input>;

export const useSuspendable: <Data, Input>(
  suspendable: Suspendable<Data, Input>
) => {
  data: Data;
  refetch: (input: Input) => void;
};

export const useSuspendableList: <Data, Input>(
  fetcher: Fetcher<Data, Input>,
  initialList?: Suspendable<Data, Input>[]
) => {
  list: Suspendable<Data, Input>[];
  append: (input: Input) => void;
  insert: (input: Input, index: number) => void;
  remove: (index: number) => void;
};
