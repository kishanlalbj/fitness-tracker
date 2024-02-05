import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home';
const Login = React.lazy(() => import('../pages/Login'));
import ProtectedRoute from './ProtectedRoute';

import NotFound from '../pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </>
  )
);

export default router;
