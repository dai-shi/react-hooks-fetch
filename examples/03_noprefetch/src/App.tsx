import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import Item from './Item';

const renderError = (error: Error) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item />
      <hr />
      <Item />
    </Suspense>
  </ErrorBoundary>
);

export default App;
