import React, { Suspense } from 'react';
import {
  render,
  flushEffects,
  cleanup,
} from 'react-testing-library';

import { ErrorBoundary, useFetch } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(useFetch).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const DisplayRemoteData = () => {
      const data = useFetch('http://...');
      if (!data) return null;
      return <span>RemoteData:{data}</span>;
    };
    const App = () => (
      <ErrorBoundary renderError={({ error }) => <span>Error: {error.message}</span>}>
        <Suspense fallback={<span>Loading...</span>}>
          <DisplayRemoteData />
        </Suspense>
      </ErrorBoundary>
    );
    const { container } = render(<App />);
    flushEffects();
    expect(container).toMatchSnapshot();
    await sleep(10); // not ideal...
    expect(container).toMatchSnapshot();
  });
});
