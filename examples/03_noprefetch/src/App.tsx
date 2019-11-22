import React, { Suspense } from 'react';

import { ErrorBoundary, createFetcher } from 'react-hooks-fetch';

import Item from './Item';

const renderError = (error: Error) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
export const fetcher = createFetcher<
  { data: { first_name: string } },
  string
>(fetchFunc);
export const initialSuspendable = { data: { first_name: '' } };

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item />
      <hr />
      <Item />
      <hr />
      <Item initialId="9" />
    </Suspense>
  </ErrorBoundary>
);
export default App;
