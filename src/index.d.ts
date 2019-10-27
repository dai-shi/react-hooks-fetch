import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Input<Data> = string | Request | (() => Promise<Data>);
type Result<Data> = { data: Data };

export const prefetch: <Data>(input: Input<Data>) => Result<Data>;

export const initialize: <Data>(initialData: Data) => Result<Data>;

export const useFetch: <Data>(
  initialResult: Result<Data>
) => Result<Data> & {
  refetch: (input: Input<Data>) => void;
};
