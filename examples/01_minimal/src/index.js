import React, { Suspense, useTransition } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, prefetch, useFetch } from 'react-hooks-fetch';

const DisplayData = ({ result }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      result.refetch('https://reqres.in/api/users/2?delay=3');
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

const initialResult = prefetch('https://reqres.in/api/users/1?delay=3');

const Main = () => {
  const result = useFetch(initialResult);
  return <DisplayData result={result} />;
};

const App = () => (
  <ErrorBoundary fallback={error => <h1>{error}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
