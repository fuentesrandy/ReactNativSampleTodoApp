import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

//
import todoWacther from "./todoWatcher"

export function* rootSaga() {
  yield all([
    todoWacther()
  ]);
}


export const sagaMiddleware = createSagaMiddleware();