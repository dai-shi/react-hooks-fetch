import { Component, ReactNode } from 'react';

type Fallback = ReactNode | ((error?: Error, retry?: () => void) => ReactNode);

export class ErrorBoundary extends Component<{ fallback: Fallback }> {}

type Result<Data, Input> = {
  data: Data;
  refetch: (input: Input) => Result<Data, Input>;
};

type CreateFetch = {
  <Data, Input>(
    fetchFunc: (input: Input) => Promise<Data>,
    initialInput: Input
  ): Result<Data, Input>;
  <Data, Input>(
    fetchFunc: (input: Input) => Promise<Data>,
    initialInput: null,
    initialData: Data
  ): Result<Data, Input>;
};

export const createFetch: CreateFetch;

export const useFetch: <Data, Input>(
  initialResult: Result<Data, Input>
) => Result<Data, Input>;
