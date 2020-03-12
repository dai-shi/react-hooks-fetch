import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import {
  ErrorBoundary,
  createFetchStore,
  useFetch,
} from 'react-hooks-fetch';

const fetchFunc = async (userId) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const store = createFetchStore(fetchFunc);
store.prefetch('1');

const DisplayData = ({ result, refetch }) => {
  const onClick = () => {
    refetch('2');
  };
  return (
    <div>
      <div>First Name: {result.data.first_name}</div>
      <button type="button" onClick={onClick}>Refetch user 2</button>
    </div>
  );
};

const Main = () => {
  const [result, refetch] = useFetch(store, '1');
  return <DisplayData result={result} refetch={refetch} />;
};

const App = () => (
  <ErrorBoundary fallback={(error) => <h1>{error.message}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

// Legacy Mode
ReactDOM.render(<App />, document.getElementById('app'));
