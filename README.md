# react-hooks-fetch

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-fetch.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-fetch)
[![npm version](https://badge.fury.io/js/react-hooks-fetch.svg)](https://badge.fury.io/js/react-hooks-fetch)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-fetch)](https://bundlephobia.com/result?p=react-hooks-fetch)

A React custom hook for data fetching with Suspense

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
3. Making use of object getters

This is an ongoing project and everything can be changed from day to day.

## Install

```bash
npm install react-hooks-fetch
```

## Usage

```javascript
import React, { Suspense } from 'react';
import { ErrorBoundary, createFetcher, useSuspendable } from 'react-hooks-fetch';

const DisplayData = ({ result }) => {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 1000,
  });
  const refetch = () => {
    startTransition(() => {
      result.refetch('2');
    });
  };
  return (
    <div>
      <div>First Name: {result.data.data.first_name}</div>
      <button type="button" onClick={refetch}>Refetch user 2</button>
      {isPending && 'Pending...'}
    </div>
  );
};

const fetchFunc = async userId => (await fetch(`https://reqres.in/api/users/${userId}?delay=3`)).json();
const suspendable = createFetcher(fetchFunc).prefetch(1);

const Main = () => {
  const result = useSuspendable(suspendable);
  return <DisplayData result={result} />;
};

const App = () => (
  <ErrorBoundary fallback={err => <h1>{err.message}</h1>}>
    <Suspense fallback={<span>Loading...</span>}>
      <Main />
    </Suspense>
  </ErrorBoundary>
);
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
[04](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/04_reducer)
[05](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/05_reactlazy)

## History

This library has been changed over time.
Here's the list of various implementations.

- [Initial version](https://github.com/dai-shi/react-hooks-fetch/tree/dab13e04b81b92ab41a06705c837f8ad87fb9608)
- [AbortController support](https://github.com/dai-shi/react-hooks-fetch/tree/767cba39180c88be2960061028004e32aaea6e4b)
- [Suspense trial](https://github.com/dai-shi/react-hooks-fetch/tree/e7027c0042df35bee029849c3fea84f9bdfb1b55)
- [Suspense&ErrorBoundary trial](https://github.com/dai-shi/react-hooks-fetch/tree/7f525b518096d4a454228fdea176ecc8d2a66183)
- [Suspense support with useRef](https://github.com/dai-shi/react-hooks-fetch/tree/af0c67e752a8cf7c2e45d3bc547ea5be0b4e71e4)
- [useReducer version](https://github.com/dai-shi/react-hooks-fetch/tree/56dd2c2566ff7c481e1b0603fa1c43fa98da565a)
- [useState version](https://github.com/dai-shi/react-hooks-fetch/commit/893e988b96a31054f23f3d5370f30db7450e547f)

## Blogs

- [React Hooks Tutorial on Developing a Custom Hook for Data Fetching](https://blog.axlight.com/posts/react-hooks-tutorial-on-developing-a-custom-hook-for-data-fetching/)
- [useFetch: React custom hook for Fetch API with Suspense and Concurrent Mode in Mind](https://blog.axlight.com/posts/usefetch-react-custom-hook-for-fetch-api-with-suspense-and-concurrent-mode-in-mind/)

