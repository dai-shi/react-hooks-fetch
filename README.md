# react-hooks-fetch

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-fetch.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-fetch)
[![npm version](https://badge.fury.io/js/react-hooks-fetch.svg)](https://badge.fury.io/js/react-hooks-fetch)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-fetch)](https://bundlephobia.com/result?p=react-hooks-fetch)

React custom hooks for data fetching with Suspense

## Important notes

If you are just looking for React hooks for Fecth API,
please visit <https://github.com/dai-shi/react-hooks-async>,
which is a more stable library that includes `useFetch`.

This is an experimental library trying to combine Fetch and Suspense,
and it is not meant for production yet.

## Introduction

[Suspense for data fetching](https://reactjs.org/docs/concurrent-mode-suspense.html) is a new feature coming in React.
This is a project to explore a handy pattern for data fetching
with React Hooks and Suspense.

There's various design choices around Suspense for data fetching.
Here's some decisions currently made:

1. No global cache
2. Simple and primitive API
3. Making use of Proxies

This is an ongoing project and everything can be changed from day to day.

## Install

```bash
npm install react-hooks-fetch
```

## Usage

```javascript
import React, { Suspense, useTransition } from 'react';
import ReactDOM from 'react-dom';

import { ErrorBoundary, createUseFetch } from 'react-hooks-fetch';

const DisplayData = ({ result, refetch }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const onClick = () => {
    startTransition(() => {
      refetch('2');
    });
  };
  return (
    <div>
      <div>First Name: {result.data.first_name}</div>
      <button type="button" onClick={onClick}>Refetch user 2</button>
      {isPending && 'Pending...'}
    </div>
  );
};

const fetchFunc = async userId => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const useFetch = createUseFetch(fetchFunc, '1');

const Main = () => {
  const { result, refetch } = useFetch();
  return <DisplayData result={result} refetch={refetch} />;
};

const App = () => (
  <ErrorBoundary fallback={error => <h1>{error.message}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/03_noprefetch)

## Blogs

See [History](./HISTORY.md) for previous implementations.

- [React Hooks Tutorial on Developing a Custom Hook for Data Fetching](https://blog.axlight.com/posts/react-hooks-tutorial-on-developing-a-custom-hook-for-data-fetching/)
- [useFetch: React custom hook for Fetch API with Suspense and Concurrent Mode in Mind](https://blog.axlight.com/posts/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind/)
- [Developing a React Library for Suspense for Data Fetching in Concurrent Mode](https://blog.axlight.com/posts/developing-a-react-library-for-suspense-for-data-fetching-in-concurrent-mode/)
- [Diving Into React Suspense Render-as-You-Fetch for REST APIs](https://blog.axlight.com/posts/diving-into-react-suspense-render-as-you-fetch-for-rest-apis/)
