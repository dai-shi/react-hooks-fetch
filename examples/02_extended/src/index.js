import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

const Err = ({ error }) => <span>Error:{error.message}</span>;

const Loading = () => <span>Loading...</span>;

const readBody = body => body.text();

const PostRemoteData = ({ userId, title, body }) => {
  // FIXME we need useSafeMemo or alike
  const opts = useMemo(() => ({
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
    readBody,
  }), [userId, title, body]);
  const { error, loading, data } = useFetch('https://jsonplaceholder.typicode.com/posts', opts);
  if (error) return <Err error={error} />;
  if (loading) return <Loading />;
  return <span>Result:{data}</span>;
};

const App = () => (
  <PostRemoteData userId={1} title="foo" body="bar" />
);

ReactDOM.render(<App />, document.getElementById('app'));
