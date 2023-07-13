import { takeLatest, put, call, fork } from 'redux-saga/effects';
import { getUserRequest, loginRequest, registerUserRequest } from './Api';
import { onLogin, setUser, getUser, setIsAuthenticated, setLoading, onRegister, registerSuccess } from './slices/Auth';

function* onLoginAsync({ payload }) {
  try {
    const { username, password } = payload;
    yield put(setLoading(true));
    const res = yield call(loginRequest, username, password);

    if (res.statusText === 'OK') {
      localStorage.setItem('tk', res.data.token);
      yield put(setIsAuthenticated(true));
    }
  } catch (error) {}
}

function* getUserAsync() {
  try {
    const res = yield call(getUserRequest);
    if (res.status === 200) {
      yield put(setUser(res.data));
    }
  } catch (error) {}
}

function* registerAsync({ payload }) {
  try {
    console.log('called async', payload);
    const res = yield call(registerUserRequest, payload);

    if (res.status === 201) {
      yield put(registerSuccess(true));
    }
  } catch (error) {}
}

function* login() {
  yield takeLatest(onLogin.type, onLoginAsync);
  yield takeLatest(getUser.type, getUserAsync);
  yield takeLatest(onRegister.type, registerAsync);
}

export const authSaga = [fork(login)];
