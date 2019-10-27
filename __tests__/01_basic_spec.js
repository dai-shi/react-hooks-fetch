import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { prefetch, useFetch } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(prefetch).toBeDefined();
    expect(useFetch).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const result = prefetch('http://...');
    const DisplayData = () => {
      const { data } = useFetch(result);
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
