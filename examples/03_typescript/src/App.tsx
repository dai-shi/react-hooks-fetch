import * as React from 'react';
import { StrictMode, Suspense } from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const App = () => (
  <StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <div><DisplayRemoteData id="1" /></div>
      <div><DisplayRemoteData id="2" /></div>
    </Suspense>
  </StrictMode>
);

export default App;
