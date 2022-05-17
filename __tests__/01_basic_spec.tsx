import React, { Suspense } from 'react';
import { render, cleanup } from '@testing-library/react';

import { FetchProvider, useFetch, useRefetch } from '../src/index';

describe('basic spec', () => {
  afterEach(cleanup);

  it('should have a function', () => {
    expect(FetchProvider).toBeDefined();
    expect(useFetch).toBeDefined();
    expect(useRefetch).toBeDefined();
  });

  it('should create a component', async () => {
    const initialUrl = 'http://...';
    const responses: Record<string, string> = { [initialUrl]: 'test data' };
    const fn = (url: string) => Promise.resolve(responses[url]);
    const DisplayData = () => {
      const { result } = useFetch(fn);
      expect(result).toBe(responses[initialUrl]);
      return <span>{result}</span>;
    };

    const App = () => (
      <FetchProvider initialInputs={[[fn, initialUrl]]}>
        <Suspense fallback={<span>Loading...</span>}>
          <DisplayData />
        </Suspense>
      </FetchProvider>
    );

    const { findByText } = render(<App />);
    await findByText('Loading...');
    await findByText(responses[initialUrl] as string);
  });
});
