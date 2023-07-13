import { CalendarMonth, Key, Person2Rounded, Straighten } from '@mui/icons-material';
import { Box, Button, Link, TextField } from '@mui/material';
import React from 'react';

const RegisterForm = (props) => {
  const {
    username,
    password,
    confirmPassword,
    height,
    dateOfBirth,
    errorFields = [],
    onRegisterChange,
    onRegister,
    onLogin
  } = props;
  return (
    <>
      <form onSubmit={onRegister}>
        <TextField
          type="text"
          name="username"
          size="large"
          error={errorFields.includes('username')}
          helperText={errorFields.includes('username') && 'Username is required'}
          placeholder="Username"
          value={username}
          onChange={onRegisterChange}
          fullWidth
          inputProps={{
            startadornment: <Person2Rounded fontSize="12px" sx={{ mr: 1 }} />
          }}
        ></TextField>

        <TextField
          sx={{ mt: 2 }}
          name="password"
          type="password"
          size="large"
          placeholder="Password"
          error={errorFields.includes('password')}
          helperText={errorFields.includes('password') && 'Password is required'}
          value={password}
          onChange={onRegisterChange}
          fullWidth
          inputProps={{
            startadornment: <Key fontSize="12px" sx={{ mr: 1 }} />
          }}
        ></TextField>

        <TextField
          sx={{ mt: 2 }}
          name="confirmPassword"
          type="password"
          size="large"
          error={errorFields.includes('confirmPassword') || (confirmPassword && password !== confirmPassword)}
          helperText={
            (errorFields.includes('confirmPassword') && 'Confirm password is required') ||
            (confirmPassword && password !== confirmPassword && "Passwords doesn't match")
          }
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onRegisterChange}
          fullWidth
          inputProps={{
            startadornment: <Key fontSize="12px" sx={{ mr: 1 }} />
          }}
        ></TextField>

        <TextField
          sx={{ mt: 2 }}
          name="height"
          type="number"
          size="large"
          min="1"
          error={errorFields.includes('height')}
          helperText={errorFields.includes('height') && 'height is required'}
          placeholder="Height"
          value={height}
          onChange={onRegisterChange}
          fullWidth
          inputProps={{
            inputProps: {
              min: 1,
              max: 250
            },
            startadornment: <Straighten fontSize="12px" sx={{ mr: 1 }} />
          }}
        ></TextField>

        <TextField
          sx={{ mt: 2 }}
          name="dateOfBirth"
          type="date"
          size="large"
          error={errorFields.includes('dateOfBirth')}
          helperText={errorFields.includes('dateOfBirth') && 'Date of Birth is required'}
          placeholder="Date Of Birth"
          value={dateOfBirth}
          onChange={onRegisterChange}
          fullWidth
          inputProps={{
            startadornment: <CalendarMonth fontSize="12px" sx={{ mr: 1 }} />
          }}
        ></TextField>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', mt: 4 }}>
          <Button type="submit" variant="contained">
            Register
          </Button>
          <Link onClick={onLogin}> Login Here</Link>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
