import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { FetchProvider, useRefetch } from 'react-hooks-fetch';

import { desc } from './fetchStore';
import Item, { ErrorItem } from './Item';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const refetch = useRefetch(desc);
  const retry = () => {
    refetch('1');
    resetErrorBoundary();
  };
  return (
    <div>
      <h1>Something went wrong.</h1>
      <p>{error.message}</p>
      <button type="button" onClick={retry}>Retry</button>
    </div>
  );
};

const App = () => (
  <FetchProvider initialInputs={[[desc, '1']]}>
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
  </FetchProvider>
);

export default App;
