"use strict";

require("core-js/modules/es.array.splice");

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInfiniteLoop = void 0;

/* eslint-disable no-console */
var lastInput = null;
var calls = [];

var checkInfiniteLoop = function checkInfiniteLoop(input) {
  var now = Date.now();
  calls.push(now);

  if (lastInput === input) {
    if (calls.length > 1) {
      if (calls[0] > now - 100) {
        console.log('Too many invocations in a short period. You probably forgot to memoize opts.');
      }

      calls.splice(0);
    }
  } else {
    if (lastInput && calls.length) {
      calls.splice(0);
    }

    lastInput = input;
  }
};

exports.checkInfiniteLoop = checkInfiniteLoop;