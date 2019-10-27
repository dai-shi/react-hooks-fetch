import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { prefetch, lazyFetch, useSuspendableFetch } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(prefetch).toBeDefined();
    expect(lazyFetch).toBeDefined();
    expect(useSuspendableFetch).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const fetchUrl = async url => (await fetch(url)).json();
    const result = prefetch(fetchUrl, 'http://...');
    const DisplayData = () => {
      const { data } = useSuspendableFetch(result);
      return <span>Data: {data}</span>;
    };
    const App = () => (
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayData />
      </Suspense>
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    await sleep(10); // not ideal...
    expect(container).toMatchSnapshot();
  });
});
