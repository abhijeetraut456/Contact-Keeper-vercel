import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../../components/layout/Spinner';

const PrivateRoutes = ({ component: Component }) => {
  const [authState] = useAuth();
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;
  return <Navigate to='/login' />;
};

export default PrivateRoutes;
