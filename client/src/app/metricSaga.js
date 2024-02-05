import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getMacrosRequest, getMetricsRequest } from './Api';
import { getMetrics, setMetrics, setMetricsError, getMacros, setMacros } from './slices/Metrics';

function* getMetricsAsync() {
  try {
    const res = yield call(getMetricsRequest);

    if (res.status === 200) yield put(setMetrics(res.data));
    else throw new Error('Error getting details');
  } catch (error) {
    yield put(setMetricsError(error.response.data));
  }
}

function* getMacrosAsync({ payload }) {
  try {
    const res = yield call(getMacrosRequest, payload);

    if (res.status === 200) yield put(setMacros(res.data));
    else throw new Error('Error getting details');
  } catch (error) {
    yield put(setMetricsError(error.response.data));
  }
}

function* getMetric() {
  yield takeLatest(getMetrics.type, getMetricsAsync);
}

function* getMacro() {
  yield takeLatest(getMacros.type, getMacrosAsync);
}

export const metricSaga = [fork(getMetric), fork(getMacro)];
