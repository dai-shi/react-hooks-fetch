import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const {
  StrictMode,
  Suspense,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => (
  <StrictMode>
    <ConcurrentMode>
      <Suspense fallback={<span>Loading...</span>}>
        <div><DisplayRemoteData id="1" /></div>
        <div><DisplayRemoteData id="2" /></div>
      </Suspense>
    </ConcurrentMode>
  </StrictMode>
);

export default App;
