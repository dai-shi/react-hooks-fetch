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
      <DisplayRemoteData />
    </Suspense>
  </ConcurrentMode>
);

export default App;
