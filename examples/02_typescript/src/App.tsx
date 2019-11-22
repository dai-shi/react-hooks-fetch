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

const items = [
  { id: '1', initialSuspendable: fetcher.run('1') },
  { id: '2', initialSuspendable: fetcher.run('2') },
  { id: '3', initialSuspendable: fetcher.run('3') },
];

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      {items.map(({ id, initialSuspendable }) => (
        <div key={id}>
          <Item initialId={id} initialSuspendable={initialSuspendable} />
          <hr />
        </div>
      ))}
    </Suspense>
  </ErrorBoundary>
);

export default App;
