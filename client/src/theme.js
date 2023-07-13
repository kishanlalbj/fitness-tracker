import { createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Cabin, Roboto, sans-serif'
  },
  palette: {
    background: {
      default: '#303030'
    }
  },
  status: {
    danger: orange[500]
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'inherit'
        }
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(0,0,0,0.275)',
          '& .Mui-focused': {
            backgroundColor: '#fff'
          }
        }
      },
      defaultProps: {
        inputProps: {
          disableunderline: 'true'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {}
      },
      defaultProps: {
        variant: 'filled'
      }
    }
  }
});

export default theme;
