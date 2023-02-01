import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api.service';
import { deactivateUser } from '../../store/slices/user.slice';
import { useAppDispatch } from '../hooks/hooks';

const UserPreferences = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    }
    dispatch(deactivateUser());
    console.log(response);

    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  return (
    <>
      <div className="container">
        <h1>User Preferences</h1>
        <NavLink to="">
          <button className="btn btn-inverted" onClick={logoutUser}>
            Logout
          </button>
        </NavLink>
      </div>
    </>
  );
};

export default UserPreferences;
