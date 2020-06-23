import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { createFetchStore, useFetch } from '../src/index';

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(createFetchStore).toBeDefined();
    expect(useFetch).toBeDefined();
  });

  it('should create a component', async () => {
    const initialUrl = 'http://...';
    const responses: Record<string, string> = { [initialUrl]: 'test data' };
    const store = createFetchStore((url: string) => Promise.resolve(responses[url]));
    store.prefetch(initialUrl);

    const DisplayData = () => {
      const [result] = useFetch(store, initialUrl);
      expect(result).toBe(responses[initialUrl]);
      return <span>{result}</span>;
    };

    const App = () => (
      <Suspense fallback={<span>Loading...</span>}>
        <DisplayData />
      </Suspense>
    );

    const { getByText, findByText } = render(<App />);
    getByText(/loading/i);
    await findByText(responses[initialUrl]);
  });
});
