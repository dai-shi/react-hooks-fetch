import React, {
  StrictMode,
  Suspense,
  unstable_ConcurrentMode as ConcurrentMode,
} from 'react';
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
    <ConcurrentMode>
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
      </Suspense>
    </ConcurrentMode>
  </StrictMode>
);

ReactDOM.render(<App />, document.getElementById('app'));
