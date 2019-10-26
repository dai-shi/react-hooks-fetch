import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { createResource, useResource } from '../src/index';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(createResource).toBeDefined();
    expect(useResource).toBeDefined();
  });

  it('should create a component', async () => {
    fetch.mockResponse(JSON.stringify('test data'));
    const resource = createResource('http://...');
    const DisplayRemoteData = () => {
      const { data } = useResource(resource);
      return <span>RemoteData: {data}</span>;
    };
    const App = () => (
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayRemoteData />
      </Suspense>
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    await sleep(10); // not ideal...
    expect(container).toMatchSnapshot();
  });
});
