import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from './slices/Auth';
import metricsReducer from './slices/Metrics';

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    metrics: metricsReducer
  },
  middleware: [saga]
});

saga.run(rootSaga);

export default store;
