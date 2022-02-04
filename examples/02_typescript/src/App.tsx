import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import Item, { ErrorItem } from './Item';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
    <button type="button" onClick={resetErrorBoundary}>Retry</button>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item />
      <hr />
      <Item />
      <hr />
      <Item />
      <hr />
      <ErrorItem />
      <hr />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ErrorItem />
      </ErrorBoundary>
    </Suspense>
  </ErrorBoundary>
);

export default App;
