import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import Main from './Main';

const renderError = (error: Error) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary fallback={renderError}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

export default App;
