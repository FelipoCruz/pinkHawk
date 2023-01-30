<<<<<<< HEAD
import { useAppSelector } from '../hooks/hooks';
import { NavLink } from 'react-router-dom';
import Button from '../components/button/Button';


const Dashboard = () => {
  const user = useAppSelector((state) => state.user)
  console.log('user id us :', user)


  return (
    <div>
      <h1> {user.id} </h1>
=======
import NavBarUser from "../components/navbar/loginnavbar/LoginNavBar";
import { useAppSelector } from "../hooks/hooks";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user);
  console.log("user in state", user);
  return (
    <div>
      <NavBarUser />
>>>>>>> 9f36b5a71c85d1d87734372d9543b2b2bc0032af
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
