import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  loading: false,
  error: null
};

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetrics: (state, { payload }) => {
      state.loading = true;
      return payload;
    },
    setMetrics: (state, action) => {
      state.data = action.payload;
      (state.loading = false), (state.error = null);
    },
    setMetricsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { getMetrics, setMetrics, setMetricsError } = metricsSlice.actions;

export default metricsSlice.reducer;
