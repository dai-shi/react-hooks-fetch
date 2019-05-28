import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => <span>Error:{error.message}</span>;

const DisplayRemoteData = () => {
  const { error, data } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <span>RemoteData:{data.title}</span>;
};

const App = () => (
  <StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <DisplayRemoteData />
    </Suspense>
  </StrictMode>
);

ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);
