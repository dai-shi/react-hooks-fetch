import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { createFetcher, useFetcher } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(createFetcher).toBeDefined();
    expect(useFetcher).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify({ str: 'test data' }));
    const fetchUrl = async url => (await fetch(url)).json();
    const fetcher = createFetcher(fetchUrl);
    const initialSuspendable = fetcher.run('http://...');
    const DisplayData = () => {
      const { data } = useFetcher(fetcher, initialSuspendable);
      return <span>Data: {data.str}</span>;
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
