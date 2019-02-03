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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var forcedReducer = function forcedReducer(state) {
  return !state;
};

var useForceUpdate = function useForceUpdate() {
  return (0, _react.useReducer)(forcedReducer, false)[1];
};

var createFetchError = function createFetchError(response) {
  var err = new Error("".concat(response.status, " ").concat(response.statusText));
  err.name = 'FetchError';
  return err;
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
  var error = (0, _react.useRef)(null);
  var loading = (0, _react.useRef)(false);
  var data = (0, _react.useRef)(null);
  var promiseResolver = (0, _react.useMemo)(createPromiseResolver, [input, opts]);
  (0, _react.useEffect)(function () {
    var finished = false;
    var abortController = new AbortController();

    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _opts$readBody, readBody, init, response, body;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (input) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              // start fetching
              error.current = null;
              loading.current = true;
              data.current = null;
              forceUpdate();
              _context.prev = 6;
              _opts$readBody = opts.readBody, readBody = _opts$readBody === void 0 ? defaultReadBody : _opts$readBody, init = _objectWithoutProperties(opts, ["readBody"]);
              _context.next = 10;
              return fetch(input, _objectSpread({}, init, {
                signal: abortController.signal
              }));

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

              if (!finished) {
                finished = true;
                data.current = body;
                loading.current = false;
              }

              _context.next = 19;
              break;

            case 18:
              if (!finished) {
                finished = true;
                error.current = createFetchError(response);
                loading.current = false;
              }

            case 19:
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](6);

              if (!finished) {
                finished = true;
                error.current = _context.t0;
                loading.current = false;
              }

            case 24:
              // finish fetching
              promiseResolver.resolve();
              forceUpdate();

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 21]]);
    }))();

    var cleanup = function cleanup() {
      if (!finished) {
        finished = true;
        abortController.abort();
      }

      error.current = null;
      loading.current = false;
      data.current = null;
    };

    return cleanup;
  }, [input, opts]);
  if (loading.current) throw promiseResolver.promise;
  return {
    error: error.current,
    data: data.current
  };
};

exports.useFetch = useFetch;