import jwtDecode from 'jwt-decode';

const verifyJWT = (token) => {
  if (!token) return false;

  const result = jwtDecode(token);

  const { exp } = result;

  if (Date.now() >= exp * 1000) {
    return false;
  } else {
    return true;
  }
};

export default verifyJWT;
