import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { createAsync, useAsync } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(createAsync).toBeDefined();
    expect(useAsync).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const result = createAsync('http://...');
    const DisplayData = () => {
      const { data } = useAsync(result);
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
