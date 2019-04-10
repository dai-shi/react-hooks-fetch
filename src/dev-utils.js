/* eslint-disable no-console */

let lastInput = null;
const calls = [];
export const checkInfiniteLoop = (input) => {
  if (lastInput === input) {
    const now = Date.now();
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
