import React from 'react';
import {
  render,
  flushEffects,
  cleanup,
} from 'react-testing-library';

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
      const { error, loading, data } = useFetch('http://...');
      if (error) return <span>Error: {error.message}</span>;
      if (loading) return <span>Loading...</span>;
      return (
        <span>RemoteData:{data}</span>
      );
    };
    const App = () => (
      <DisplayRemoteData />
    );
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    flushEffects();
    await sleep(10); // not ideal...
    expect(container).toMatchSnapshot();
  });
});
