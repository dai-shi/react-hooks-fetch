"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkInfiniteLoop = void 0;

require("core-js/modules/es6.date.now");

/* eslint-disable no-console */
var lastInput = null;
var calls = [];

var checkInfiniteLoop = function checkInfiniteLoop(input) {
  if (lastInput === input) {
    var now = Date.now();

    if (calls.length > 10) {
      if (calls[0] > now - 100) {
        console.log('Too many invocations in a short period. You probably forgot to memoize opts.');
      }

      calls.splice(0);
    } else {
      calls.push(now);
    }
  } else {
    lastInput = input;

    if (calls.length) {
      calls.splice(0);
    }
  }
};

exports.checkInfiniteLoop = checkInfiniteLoop;