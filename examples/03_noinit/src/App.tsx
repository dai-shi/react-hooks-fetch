import React, { Suspense } from 'react';

import Item from './Item';

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          Error: {(error && (error as unknown as { message: string }).message) || error}
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

const App: React.FC = () => (
  <ErrorBoundary>
    <Suspense fallback={<span>Loading...</span>}>
      <Item />
      <hr />
      <Item />
    </Suspense>
  </ErrorBoundary>
);

export default App;
