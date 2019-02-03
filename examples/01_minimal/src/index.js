import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => <span>Error:{error.message}</span>;

const DisplayRemoteData = () => {
  const data = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!data) return null;
  return <span>RemoteData:{data.title}</span>;
};

const App = () => (
  <ErrorBoundary renderError={Err}>
    <Suspense fallback={<span>Loading...</span>}>
      <DisplayRemoteData />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('app'));
