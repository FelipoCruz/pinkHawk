import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api.service';
import { deactivateUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAuthUrl } from '../../services/api.service';
import RightMenuButton from '../components/userpreferences/user-submenu/UserSubmenu';
import '../../scss/_user-preference.scss';

const UserPreferences = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ user }) => user);
  
  const handleClickNavigate = async () => {
    navigate('/dashboard/co-pilot');
  };

  const handleClick = async () => {
    try {
      const res = await getAuthUrl(user.id);
      window.location.href = res.url;
    } catch (error) {
      console.log('error in handleClick in fetAuthUul', error);
    }
  };

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    }

    dispatch(deactivateUser());
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  return (
    <>
      <div className='container-user-settings'>
        <h1>User Preferences</h1>
        <div className='right-menu-slide-right'>
          <RightMenuButton />
        </div>
        <div className='current-user-settings' onClick={handleClickNavigate}>
          <div className='frequency-tweet-posting'>
            <p>Current daily posting frequency:</p>
            {user.frequencyTweetPosting}
          </div>
          <div className="selected-hours">
            <p>Selected posting hours:</p>
            {user.postingHours.map((hour: number) => (
              <p key={hour}>{hour < 10 ? `0${hour}:00 h` : `${hour}:00 h`}</p>
            ))}
          </div>
        </div>
        <div className="connection-to-twitter">
          <p>Connection to Twitter:</p>
          {user.twitterToken !== null
            ? 'Connected to Twitter'
            : 'Not connected to Twitter'}
          <button onClick={handleClick} className="connect-btn">
            Connect to Twitter
          </button>
          <NavLink to="">
            <button className="btn btn-inverted" onClick={logoutUser}>
              Logout
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserPreferences;
