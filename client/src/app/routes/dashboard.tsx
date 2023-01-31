import { useAppSelector } from '../hooks/hooks';
import { NavLink } from 'react-router-dom';
import Button from '../components/button/Button';
import NavBarUser from '../components/navbar/loginnavbar/LoginNavBar';
import { getAuthUrl } from '../../services/api.service';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log('user id us :', user);

   const handleClick = async () =>{
    const res = await getAuthUrl()
    window.location.href = res.url;
   }

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
      <button onClick={handleClick}>authorize with twitter</button>
    </div>
  );
};

export default Dashboard;
