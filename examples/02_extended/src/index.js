import React, {
  Suspense,
  useRef,
  unstable_ConcurrentMode as ConcurrentMode,
} from 'react';
import ReactDOM from 'react-dom';

import { useFetch } from 'react-hooks-fetch';

// this can be too naive
const useMemoPrev = (create, inputs) => {
  const memoized = useRef(null);
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
  const opts = useMemoPrev(() => ({
    method: 'POST',
    body: JSON.stringify({
      userId,
      title,
      body,
    }),
    readBody,
  }), [userId, title, body]);
  const { error, data } = useFetch('https://jsonplaceholder.typicode.com/posts', opts);
  if (error) return <Err error={error} />;
  if (!data) return null;
  return <span>Result:{data}</span>;
};

const App = () => (
  <ConcurrentMode>
    <Suspense fallback={<span>Loading...</span>}>
      <PostRemoteData userId={1} title="foo" body="bar" />
    </Suspense>
  </ConcurrentMode>
);

ReactDOM.render(<App />, document.getElementById('app'));
