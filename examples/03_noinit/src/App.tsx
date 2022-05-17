import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { FetchProvider } from 'react-hooks-fetch';

import {
  fetchFunc1,
  fetchFunc2,
  fetchFunc3,
  fetchFunc4,
} from './fetchStore';
import Item from './Item';

const ErrorFallback = ({ error }: FallbackProps) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const App = () => (
  <FetchProvider initialInputs={[
    [fetchFunc1, '1'],
    [fetchFunc2, '2'],
  ]}
  >
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<span>Loading...</span>}>
        <Item fetchFunc={fetchFunc1} />
        <hr />
        <Item fetchFunc={fetchFunc2} />
        <hr />
        <Item fetchFunc={fetchFunc3} />
        <hr />
        <Item fetchFunc={fetchFunc4} />
      </Suspense>
    </ErrorBoundary>
  </FetchProvider>
);
export default App;
