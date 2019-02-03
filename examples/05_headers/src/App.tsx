import * as React from 'react';

import { ErrorBoundary } from 'react-hooks-fetch';

import DisplayRemoteData from './DisplayRemoteData';

const { Suspense } = React;

const Err: React.FC<{ error: Error }> = ({ error }) => <span>Error:{error.message}</span>;

const App = () => (
  <ErrorBoundary renderError={Err}>
    <Suspense fallback={<span>Loading...</span>}>
      <DisplayRemoteData />
    </Suspense>
  </ErrorBoundary>
);

export default App;
