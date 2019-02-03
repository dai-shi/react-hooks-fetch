import * as React from 'react';

import DisplayRemoteData from './DisplayRemoteData';

const { Suspense } = React;

const App = () => (
  <Suspense fallback={<span>Loading...</span>}>
    <div><DisplayRemoteData id="1" /></div>
    <div><DisplayRemoteData id="2" /></div>
  </Suspense>
);

export default App;
