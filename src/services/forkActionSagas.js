import { call, take, fork } from 'redux-saga/effects';

export function* takeAction(pattern, saga, ...args) {
  console.log("Long")
  const task = yield fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
  return task;
}