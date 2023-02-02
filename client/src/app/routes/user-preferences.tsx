import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api.service';
import { deactivateUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAuthUrl } from '../../services/api.service';

const UserPreferences = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

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

  const handleClick = async () => {
    const res = await getAuthUrl(user.id);
    window.location.href = res.url;
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
        <button onClick={handleClick} className='connect-btn'>Connect to your Twitter account</button>
      </div>
    </>
  );
};

export default UserPreferences;
