import { FitnessCenterRounded } from '@mui/icons-material';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

const Header = (props) => {
  const { handleLogout, showLogout } = props;

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <FitnessCenterRounded sx={{ display: { md: 'flex' }, mr: 1 }} />
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              GetFit
            </Typography>
          </Link>
          <Box sx={{ flex: 1 }}></Box>
          {showLogout && (
            <>
              <Link to="/workouts" style={{ color: '#fff', textDecoration: 'none' }}>
                Workouts
              </Link>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
