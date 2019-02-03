import React, { Suspense, useRef } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, useFetch } from 'react-hooks-fetch';

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
  const data = useFetch('https://jsonplaceholder.typicode.com/posts', opts);
  if (!data) return null;
  return <span>Result:{data}</span>;
};

const App = () => (
  <ErrorBoundary renderError={Err}>
    <Suspense fallback={<span>Loading...</span>}>
      <PostRemoteData userId={1} title="foo" body="bar" />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.render(<App />, document.getElementById('app'));
