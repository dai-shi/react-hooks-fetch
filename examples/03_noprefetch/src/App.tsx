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
const fetcher = createFetcher<
  { data: { first_name: string } },
  string
>(fetchFunc);
const fallbackData = { data: { first_name: '' } };
const lazy1 = fetcher.lazyFetch(fallbackData);
const lazy2 = fetcher.lazyFetch(fallbackData);
const lazy3 = fetcher.lazyFetch(fallbackData);

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item suspendable={lazy1} />
      <hr />
      <Item suspendable={lazy2} />
      <hr />
      <Item initialId="9" suspendable={lazy3} />
    </Suspense>
  </ErrorBoundary>
);
export default App;
