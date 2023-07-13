import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getMetricsRequest } from './Api';
import { getMetrics, setMetrics, setMetricsError } from './slices/Metrics';

function* getMetricsAsync() {
  try {
    const res = yield call(getMetricsRequest);

    if (res.status === 200) yield put(setMetrics(res.data));
    else throw new Error('Error getting details');
  } catch (error) {
    yield put(setMetricsError(error.response.data));
  }
}

function* getMetric() {
  yield takeLatest(getMetrics.type, getMetricsAsync);
}

export const metricSaga = [fork(getMetric)];
