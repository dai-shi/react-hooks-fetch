import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Body, Request, RequestInit } from 'node-fetch';

type Opts<Data> = RequestInit & {
  bodyReader?: (b: Body) => Promise<Data>;
};

type Falsy = false | 0 | '' | null | undefined;
export type UseFetch = <Data>(
  input: string | Request | Falsy,
  opts?: Opts<Data> | Falsy,
) => Data | null;

export const useFetch: UseFetch;

export type ErrorBoundaryProps = {
  renderError: React.ComponentType<{ error: Error }>;
};

export const ErrorBoundary: React.ComponentType<ErrorBoundaryProps>;
