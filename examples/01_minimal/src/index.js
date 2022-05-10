import React, { Suspense, useTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { FetchProvider, createFetch, useFetch } from 'react-hooks-fetch';

const fetchFunc = async (userId) => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const desc = createFetch(fetchFunc);

const DisplayData = ({ result, refetch }) => {
  const [isPending, startTransition] = useTransition();
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

const Main = () => {
  const { result, refetch } = useFetch(desc);
  return <DisplayData result={result} refetch={refetch} />;
};

const ErrorFallback = ({ error }) => (
  <h1>{error.message}</h1>
);

const App = () => (
  <FetchProvider initialInputs={[[desc, '1']]}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<span>Loading...</span>}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  </FetchProvider>
);

createRoot(document.getElementById('app')).render(<App />);
