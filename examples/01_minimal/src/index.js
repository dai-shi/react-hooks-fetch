import React, { Suspense, useTransition } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, createUseFetch } from 'react-hooks-fetch';

const DisplayData = ({ result, refetch }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      refetch('2');
    });
  };
  return (
    <div>
      <div>First Name: {result.data.first_name}</div>
      <button type="button" onClick={onClick}>Refetch user 2</button>
      {isPending && 'Pending...'}
    </div>
  );
};

const fetchFunc = async userId => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const useFetch = createUseFetch(fetchFunc, '1');

const Main = () => {
  const { result, refetch } = useFetch();
  return <DisplayData result={result} refetch={refetch} />;
};

const App = () => (
  <ErrorBoundary fallback={error => <h1>{error.message}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
