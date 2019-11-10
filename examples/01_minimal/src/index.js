import React, { Suspense, useTransition } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, createFetcher, useFetcher } from 'react-hooks-fetch';

const DisplayData = ({ result }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      result.refetch('2');
    });
  };
  return (
    <div>
      <div>First Name: {result.data.data.first_name}</div>
      <button type="button" onClick={refetch}>Refetch user 2</button>
      {isPending && 'Pending...'}
    </div>
  );
};

const fetchFunc = async userId => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const fetcher = createFetcher(fetchFunc, null, '1');

const Main = () => {
  const result = useFetcher(fetcher);
  return <DisplayData result={result} />;
};

const App = () => (
  <ErrorBoundary fallback={error => <h1>{error.message}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
