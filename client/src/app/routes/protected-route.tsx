import { useAppSelector } from '../hooks/hooks';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: any) => {
  // const { isLoggedIn } = useAppSelector((state) => state.auth);
  const isLoggedIn = Boolean(localStorage.getItem('user'));
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate to={'/login'} replace state={{ path: location.pathname }} />
    );
  }
  return children;
};

export default ProtectedRoute;
