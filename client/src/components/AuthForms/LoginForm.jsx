import { Key, Person2Rounded } from '@mui/icons-material';
import { Box, Button, CardActions, Link, TextField } from '@mui/material';
import React from 'react';

const LoginForm = (props) => {
  const { username, password, onLoginFormChange, onRegister, errorFields = [], onLogin } = props;

  return (
    <div>
      <Box sx={{ mt: 2 }}>
        <form>
          <TextField
            type="text"
            name="username"
            error={errorFields.includes('username')}
            helperText={errorFields.includes('username') && 'Username is required'}
            placeholder="Username"
            variant="filled"
            value={username}
            onChange={onLoginFormChange}
            fullWidth
            inputProps={{
              startadornment: <Person2Rounded sx={{ mr: 1 }} />
            }}
            required
          ></TextField>

          <TextField
            sx={{ mt: 2 }}
            name="password"
            type="password"
            placeholder="Password"
            error={errorFields.includes('password')}
            helperText={errorFields.includes('password') && 'Password is required'}
            variant="filled"
            value={password}
            onChange={onLoginFormChange}
            fullWidth
            inputProps={{
              startadornment: <Key sx={{ mr: 1 }} />
            }}
          ></TextField>

          <CardActions sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <Button type="submit" variant="contained" color="primary" onClick={onLogin}>
              Login
            </Button>

            <Link onClick={onRegister}>Register Here</Link>
          </CardActions>
        </form>
      </Box>
    </div>
  );
};

export default LoginForm;
