import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import Item, { ErrorItem } from './Item';

const renderError = (error: Error, retry: () => void) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
    <button type="button" onClick={retry}>Retry</button>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item />
      <hr />
      <Item />
      <hr />
      <Item />
      <hr />
      <ErrorItem />
      <hr />
      <ErrorBoundary fallback={renderError}>
        <ErrorItem />
      </ErrorBoundary>
    </Suspense>
  </ErrorBoundary>
);

export default App;
