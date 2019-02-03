import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { Suspense } = React;

const App = () => (
  <div>
    <Suspense fallback={<span>Loading...</span>}>
      <DisplayRemoteData id="1" />
      <DisplayRemoteData id="2" />
    </Suspense>
  </div>
);

export default App;
