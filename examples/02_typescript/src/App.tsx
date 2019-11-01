import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import { createFetcher } from 'react-hooks-fetch';

import Item from './Item';

const renderError = (error: Error) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const fetchFunc = async (userId: string) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const fetcher = createFetcher<
  { data: { first_name: string } },
  string
>(fetchFunc);

const items = [
  { id: '1', suspendable: fetcher.prefetch('1') },
  { id: '2', suspendable: fetcher.prefetch('2') },
  { id: '3', suspendable: fetcher.prefetch('3') },
];

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      {items.map(({ id, suspendable }) => (
        <div key={id}>
          <Item initialId={id} suspendable={suspendable} />
          <hr />
        </div>
      ))}
    </Suspense>
  </ErrorBoundary>
);

export default App;
