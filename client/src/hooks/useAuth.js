import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated;
};

export default useAuth;
