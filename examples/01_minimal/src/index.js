import React from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => (
  <span>
    Error:
    {error.message}
  </span>
);

const Loading = () => <span>Loading...</span>;

const DisplayRemoteData = () => {
  const { error, loading, data } = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  if (error) return <Err error={error} />;
  if (loading) return <Loading />;
  return (
    <span>
      RemoteData:
      {data.title}
    </span>
  );
};

const App = () => (
  <DisplayRemoteData />
);

ReactDOM.render(<App />, document.getElementById('app'));
