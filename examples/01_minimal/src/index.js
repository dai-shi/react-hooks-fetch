import React, { Suspense, useTransition } from 'react';
import ReactDOM from 'react-dom';

import { createResource, useResource } from 'react-hooks-fetch';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          Error: {(error && error.message) || error}
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

const DisplayData = ({ resource }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      resource.refetch('https://reqres.in/api/users/2?delay=3');
    });
  };
  return (
    <div>
      <div>First Name: {resource.data.data.first_name}</div>
      <button type="button" onClick={refetch}>Refetch user 2</button>
      {isPending && 'Pending...'}
    </div>
  );
};

const initialResource = createResource('https://reqres.in/api/users/1?delay=3');

const Main = () => {
  const resource = useResource(initialResource);
  return <DisplayData resource={resource} />;
};

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
