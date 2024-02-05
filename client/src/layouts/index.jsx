import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout, setIsAuthenticated } from '../app/slices/Auth';
import Header from '../components/Header/Header';
import verifyJWT from '../utils/verifyJWT';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated = false } = useSelector((state) => state.auth);

  useEffect(() => {
    let token = localStorage.getItem('tk');

    if (verifyJWT(token)) {
      dispatch(setIsAuthenticated(true));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
    else {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Header handleLogout={handleLogout} showLogout={isAuthenticated} />

      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
