import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const {
  Suspense,
  // @ts-ignore
  unstable_ConcurrentMode: ConcurrentMode,
} = React;

const App = () => (
  <ConcurrentMode>
    <Suspense fallback={<span>Loading...</span>}>
      <div><DisplayRemoteData id="1" /></div>
      <div><DisplayRemoteData id="2" /></div>
    </Suspense>
  </ConcurrentMode>
);

export default App;
