import { useAppSelector } from '../hooks/hooks';
import { NavLink } from 'react-router-dom';
import Button from '../components/button/Button';
import NavBarUser from '../components/navbar/loginnavbar/LoginNavBar';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log('user id us :', user);

  return (
    <div>
      <NavBarUser />
      <h1>Dashboard</h1>
      <NavLink to="/topics-definition">
        <Button text={'topics-definition'} type={'btn-inverted'} />
      </NavLink>
      <NavLink to="/co-pilot">
        <Button text={'co-pilot'} type={'btn-inverted'} />
      </NavLink>
    </div>
  );
};

export default Dashboard;
