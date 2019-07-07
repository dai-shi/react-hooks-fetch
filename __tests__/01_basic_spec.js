import React, { StrictMode, Suspense } from 'react';
import { render, cleanup } from 'react-testing-library';

import { useFetch } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(useFetch).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const DisplayRemoteData = () => {
      const { error, data } = useFetch('http://...');
      if (error) return <span>Error: {error.message}</span>;
      if (!data) return null; // this is important
      return <span>RemoteData: {data}</span>;
    };
    const App = () => (
      <StrictMode>
        <Suspense fallback={<span>Loading...</span>}>
          <DisplayRemoteData />
        </Suspense>
      </StrictMode>
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    await sleep(10); // not ideal...
    expect(container).toMatchSnapshot();
  });
});
