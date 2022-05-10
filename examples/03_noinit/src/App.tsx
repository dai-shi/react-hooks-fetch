import React, { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { FetchProvider } from 'react-hooks-fetch';

import {
  desc1,
  desc2,
  desc3,
  desc4,
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
    [desc1, '1'],
    [desc2, '2'],
  ]}
  >
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<span>Loading...</span>}>
        <Item desc={desc1} />
        <hr />
        <Item desc={desc2} />
        <hr />
        <Item desc={desc3} />
        <hr />
        <Item desc={desc4} />
      </Suspense>
    </ErrorBoundary>
  </FetchProvider>
);
export default App;
