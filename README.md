react-hooks-fetch
=================

[![Build Status](https://travis-ci.com/dai-shi/react-hooks-fetch.svg?branch=master)](https://travis-ci.com/dai-shi/react-hooks-fetch)
[![npm version](https://badge.fury.io/js/react-hooks-fetch.svg)](https://badge.fury.io/js/react-hooks-fetch)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-hooks-fetch)](https://bundlephobia.com/result?p=react-hooks-fetch)

A React custom hook for Fetch API

Install
-------

```bash
npm install react-hooks-fetch
```

Usage
-----

```javascript
import React from 'react';
import { useFetch } from 'react-hooks-fetch';

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
```

Examples
--------

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/02_extended)
[03](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/03_typescript)
[04](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/04_abort)
[05](https://codesandbox.io/s/github/dai-shi/react-hooks-fetch/tree/master/examples/05_headers)

Blogs
-----

- [React Hooks Tutorial on Developing a Custom Hook for Data Fetching](https://medium.com/@dai_shi/react-hooks-tutorial-on-developing-a-custom-hook-for-data-fetching-8ad5840db7ae)
