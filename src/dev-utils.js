/* eslint-disable no-console */

let lastInput = null;
const calls = [];
export const checkInfiniteLoop = (input) => {
  const now = Date.now();
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
