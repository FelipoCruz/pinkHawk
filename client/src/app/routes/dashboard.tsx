import { useAppSelector } from '../hooks/hooks';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../components/button/Button';
import NavBarUser from '../components/navbar/loginnavbar/LoginNavBar';
import { getAuthUrl } from '../../services/api.service';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log('user id us :', user);

  const handleClick = async () => {
    const res = await getAuthUrl(user.id);
    window.location.href = res.url;
  };

  return (
    <div className="dashboard-container">
      <NavBarUser />
      {/* <nav className="dashboard-nav">
        <NavLink to="/dashboard/topics-definition">
          <Button text={'topics-definition'} type={'btn-inverted'} />
        </NavLink>
        <NavLink to="/dashboard/co-pilot">
          <Button text={'co-pilot'} type={'btn-inverted'} />
        </NavLink>
        <img src="/Twitter-logo-png.png" alt="twitter-logo" width="50px"></img>
        <button onClick={handleClick}>authorize with twitter</button>
      </nav> */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
