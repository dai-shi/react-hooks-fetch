import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import { store } from './fetchStore';
import Item from './Item';

store.prefetch('1');
store.prefetch('2');

const ErrorFallback = ({ error }: FallbackProps) => (
  <div>
    <h1>Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

const App: React.FC = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<span>Loading...</span>}>
      <Item initialId="1" />
      <hr />
      <Item initialId="2" />
      <hr />
      <Item />
      <hr />
      <Item />
    </Suspense>
  </ErrorBoundary>
);
export default App;
