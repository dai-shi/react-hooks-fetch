import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { createFetcher, useSuspendable } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(createFetcher).toBeDefined();
    expect(useSuspendable).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const fetchUrl = async url => (await fetch(url)).json();
    const result = createFetcher(fetchUrl).prefetch('http://...');
    const DisplayData = () => {
      const { data } = useSuspendable(result);
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
