import { useAppSelector } from '../hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  const loggeIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!loggeIn) {
    return (
      <Navigate to={'/login'} replace state={{ path: location.pathname }} />
    );
  }
  return children;
};

export default ProtectedRoute;
