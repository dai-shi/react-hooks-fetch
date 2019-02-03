import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { Suspense } = React;

const App = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <DisplayRemoteData />
  </Suspense>
);

export default App;
