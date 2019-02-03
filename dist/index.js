"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetch = void 0;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.promise");

var _react = require("react");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var forcedReducer = function forcedReducer(state) {
  return !state;
};

var useForceUpdate = function useForceUpdate() {
  return (0, _react.useReducer)(forcedReducer, false)[1];
};

var createPromiseResolver = function createPromiseResolver() {
  var resolve;
  var promise = new Promise(function (r) {
    resolve = r;
  });
  return {
    resolve: resolve,
    promise: promise
  };
};

var defaultOpts = {};

var defaultReadBody = function defaultReadBody(body) {
  return body.json();
};

var useFetch = function useFetch(input) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;
  var forceUpdate = useForceUpdate();
  var started = (0, _react.useRef)(false);
  var error = (0, _react.useRef)(null);
  var loading = (0, _react.useRef)(true);
  var data = (0, _react.useRef)(null);
  var abortController = (0, _react.useRef)(null);
  var abort = (0, _react.useCallback)(function () {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);
  var promiseResolver = (0, _react.useMemo)(createPromiseResolver, [input, opts]);

  var _opts$readBody = opts.readBody,
      readBody = _opts$readBody === void 0 ? defaultReadBody : _opts$readBody,
      _opts$noSuspense = opts.noSuspense,
      noSuspense = _opts$noSuspense === void 0 ? false : _opts$noSuspense,
      init = _objectWithoutProperties(opts, ["readBody", "noSuspense"]);

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var controller, response, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              controller = new AbortController();
              abortController.current = controller;
              started.current = true;
              error.current = null;
              loading.current = true;
              data.current = null;
              forceUpdate();
              _context.prev = 7;
              _context.next = 10;
              return fetch(input, _objectSpread({
                signal: abortController.current.signal
              }, init));

            case 10:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 18;
                break;
              }

              _context.next = 14;
              return readBody(response);

            case 14:
              body = _context.sent;

              if (abortController.current === controller) {
                data.current = body;
                abortController.current = null;
              }

              _context.next = 19;
              break;

            case 18:
              if (abortController.current === controller) {
                error.current = new Error(response.statusText);
                abortController.current = null;
              }

            case 19:
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](7);

              if (abortController.current === controller) {
                error.current = _context.t0;
                abortController.current = null;
              }

            case 24:
              started.current = false;
              loading.current = false;
              promiseResolver.resolve();
              forceUpdate();

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 21]]);
    }))();

    var cleanup = function cleanup() {
      if (abortController.current) {
        abortController.current.abort();
        abortController.current = null;
      }
    };

    return cleanup;
  }, [input, opts]);

  if (!noSuspense && started.current && loading.current) {
    throw promiseResolver.promise;
  }

  return _objectSpread({
    error: error.current
  }, noSuspense ? {
    loading: loading.current
  } : {}, {
    data: data.current,
    abort: abort
  });
};

exports.useFetch = useFetch;