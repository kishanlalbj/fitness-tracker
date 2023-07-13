import { all } from 'redux-saga/effects';
import { authSaga } from './authSaga';
import { metricSaga } from './metricSaga';

export default function* rootSaga() {
  yield all([...authSaga, ...metricSaga]);
}
