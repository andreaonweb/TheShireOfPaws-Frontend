import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default RequireAuth;
