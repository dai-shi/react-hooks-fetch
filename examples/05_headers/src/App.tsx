import * as React from 'react';
import { StrictMode, Suspense } from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const App = () => (
  <StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <DisplayRemoteData />
    </Suspense>
  </StrictMode>
);

export default App;
