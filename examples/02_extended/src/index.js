import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

// this can be too naive
const useMemoSafe = (create, inputs) => {
  const memoized = useRef();
  const prevInputs = useRef([]);
  if (prevInputs.current.length !== inputs.length
    || prevInputs.current.some((x, i) => x !== inputs[i])) {
    prevInputs.current = inputs;
    memoized.current = create();
  }
  return memoized.current;
};

const Err = ({ error }) => <span>Error:{error.message}</span>;

const Loading = () => <span>Loading...</span>;

const readBody = body => body.text();

const PostRemoteData = ({ userId, title, body }) => {
  const opts = useMemoSafe(() => ({
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
    readBody,
    noSuspense: true,
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
