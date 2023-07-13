import React from 'react';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './App.css';
import AuthContext from './contexts/AuthContext';

import router from './routes';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext.Provider>
  );
}

export default App;
