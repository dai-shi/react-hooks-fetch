import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import List from './List';

const renderError = (error: Error) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <List />
    </Suspense>
  </ErrorBoundary>
);

export default App;
