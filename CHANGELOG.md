# Change Log

## [Unreleased]

## [0.16.1] - 2022-05-17
### Changed
- Fix peer dependencies

## [0.16.0] - 2022-05-17
### Changed
- New context-based API (cache size one) #36

## [0.15.0] - 2022-02-07
### Changed
- New simplified API (no WeakMap)
### Removed
- ErrorBoundary (use react-error-boundary instead)

## [0.14.0] - 2020-03-15
### Changed
- New API for Data Fetching with Suspense
  - does not depend on react-suspense-fetch

----

## [0.13.0-experimental.1] - 2020-01-13
### Changed
- Renew hooks API (no factory)

## [0.12.0-experimental.5] - 2020-01-04
### Changed
- Support clearing prefetched result

## [0.12.0-experimental.4] - 2019-12-21
### Changed
- Support ErrorBoundary retry

## [0.12.0-experimental.2] - 2019-12-19
### Changed
- Improve noprefetch API and example

## [0.12.0-experimental.1] - 2019-12-18
### Changed
- New hooks based on react-suspense-fetch
### Removed
- Some of examples that are not supported yet

## [0.11.0-experimental.11] - 2019-11-22
### Changed
- Simplified API without fallback

## [0.11.0-experimental.10] - 2019-11-10
### Changed
- New API with Proxies

## [0.11.0-experimental.9] - 2019-11-10
### Added
- Support combining fetcher for incremental loading
### Removed
- useSuspendableList API

## [0.11.0-experimental.8] - 2019-11-01
### Changed
- Improve lazyFetch with example

## [0.11.0-experimental.7] - 2019-10-30
### Changed
- New API named createFetcher / useSuspendable / useSuspendableList

## [0.11.0-experimental.6] - 2019-10-27
### Changed
- Rename to prefetch / lazyFetch / useSuspendableFetch

## [0.11.0-experimental.5] - 2019-10-27
### Changed
- Rename to createFetch and fetchFunc is always required

## [0.11.0-experimental.4] - 2019-10-27
### Changed
- Rename to prefetch/useFetch

## [0.11.0-experimental.3] - 2019-10-26
### Changed
- Rename to createAsync/useAsync
- New API to initilize result without async: createStatic

## [0.11.0-experimental.2] - 2019-10-26
### Changed
- Use object getters instead of proxies

## [0.11.0-experimental.1] - 2019-10-26
### Changed
- Totally redesign with Suspense for data fetching

----

## [0.10.0] - 2019-04-17
### Added
- Experimetal loop detection in DEV mode
- Update dependencies (incl. core-js@3)

## [0.9.0] - 2019-03-08
### Changed
- Removed @types/node-fetch
- Re-implemented without useRef

## [0.8.0] - 2019-02-09
### Changed
- Updated dependencies (React 16.8)
- A hack to useLayoutEffect for Concurrent Mode

## [0.7.0] - 2019-02-03
### Added
- Suspense only API (breaking change)

## [0.6.0] - 2019-02-03
### Added
- Experimental suspense support (breaking change)

## [0.5.0] - 2018-12-09
### Changed
- Fix unmount warning

## [0.4.0] - 2018-12-09
### Changed
- Fix type definition

## [0.3.0] - 2018-12-09
### Changed
- Better abort support

## [0.2.0] - 2018-12-08
### Added
- Abort support

## [0.1.0] - 2018-11-29
### Added
- Initial release
