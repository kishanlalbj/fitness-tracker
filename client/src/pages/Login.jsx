import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin, onRegister } from '../app/slices/Auth';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoginForm from '../components/AuthForms/LoginForm';
import RegisterForm from '../components/AuthForms/RegisterForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  const { registerSuccess } = useSelector((state) => state.auth);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    username: 'test',
    password: 'test',
    confirmPassword: 'test',
    height: 172,
    dateOfBirth: ''
  });

  const [errorFields, setErrorFields] = useState([]);

  const [showRegistration, setShowRegistration] = useState(false);

  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (isAuth) navigate('/home');
  }, [isAuth]);

  const handleChange = (e) => {
    setLoginForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleOnLogin = async (e) => {
    e.preventDefault();

    let emptyFields = [];
    Object.keys(loginForm).forEach((key) => {
      if (!loginForm[key]) return emptyFields.push(key);
    });

    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      return;
    }

    dispatch(onLogin({ username: loginForm.username, password: loginForm.password }));
  };

  const handleRegisterChange = (e) => {
    setRegisterForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  useEffect(() => {
    if (
      registerForm.password &&
      registerForm.confirmPassword &&
      registerForm.password !== registerForm.confirmPassword
    ) {
      setErrorFields([...errorFields, 'confirmPassword']);
      setPasswordError(true);
    }
  }, [registerForm.password, registerForm.confirmPassword]);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('called register');
    let emptyFields = [];
    Object.keys(registerForm).forEach((key) => {
      if (!registerForm[key]) return emptyFields.push(key);
    });

    if (emptyFields.length > 0) {
      setErrorFields(emptyFields);
      return;
    }
    dispatch(onRegister(registerForm));
  };

  const toggleForm = () => {
    setShowRegistration((prev) => !prev);
  };

  useEffect(() => {
    setShowRegistration(false);
  }, [registerSuccess]);

  return (
    <Grid container alignItems={'center'} justifyContent="center" sx={{ height: '100%' }}>
      <Grid item md={5} sm={12} xs={12}>
        {!showRegistration ? (
          <Card sx={{ p: 2 }}>
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700 }}>
              Login
            </Typography>
            <LoginForm
              username={loginForm.username}
              password={loginForm.password}
              errorFields={errorFields}
              onLoginFormChange={handleChange}
              onLogin={handleOnLogin}
              onRegister={toggleForm}
            ></LoginForm>
          </Card>
        ) : (
          <Card>
            <CardHeader title="Register"></CardHeader>
            <CardContent>
              <RegisterForm
                username={registerForm.username}
                password={registerForm.password}
                confirmPassword={registerForm.confirmPassword}
                onRegisterChange={handleRegisterChange}
                height={registerForm.height}
                dateOfBirth={registerForm.dateOfBirth}
                errorFields={errorFields}
                onLogin={() => setRegisterForm(false)}
                onRegister={handleRegister}
              />
            </CardContent>
          </Card>
        )}
      </Grid>

      {error && <p> {error}</p>}
    </Grid>
  );
};

export default Login;
