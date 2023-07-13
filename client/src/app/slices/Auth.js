import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  registerSuccess: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onLogin: ({ payload }) => {
      return payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    getUser: ({ payload }) => {
      return payload;
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    onRegister: ({ payload }) => {
      return payload;
    },
    registerSuccess: (state, action) => {
      console.log(action);
      state.loading = false;
      state.registerSuccess = action.payload;
    }
  }
});

export const { onLogin, setIsAuthenticated, setUser, getUser, logout, setLoading, onRegister, registerSuccess } =
  authSlice.actions;

export default authSlice.reducer;
