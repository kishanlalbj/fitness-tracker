import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Layout from '../layouts';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Workouts from '../pages/Workouts';
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

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </>
  )
);

export default router;
