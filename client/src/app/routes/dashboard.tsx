import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom';
import Button from '../components/button/Button';
import NavBarUser from '../components/navbar/loginnavbar/LoginNavBar';
import { getAuthUrl, getUserById } from '../../services/api.service';
import { useEffect } from 'react';
import IUser from '../interfaces/user.interface';
import { activeUser } from '../../store/slices/user.slice';
import CoPilot from './co-pilot';
import Selection from '../components/navbar/copilotmenubutton/Selection/Selection';
import Queue from '../components/navbar/copilotmenubutton/Queu/Queue';
import TopicsDefinition from './topics-definition';
import UserPreferences from './user-preferences-2';

const Dashboard = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('isLoggedIn in App', isLoggedIn);

    if (!isLoggedIn) {
      (async () => {
        let storedString = localStorage.getItem('user');
        if (storedString) {
          const storedUser: IUser = JSON.parse(storedString);
          console.log('storedUser', storedUser);

          if (storedUser) {
            const user: IUser = await getUserById(storedUser.id);
            console.log(user);

            dispatch(activeUser(user));
          }
        }
      })();
    }
  }, []);

  return (
    <div className="dashboard">
      <NavBarUser />
      <Routes>
        <Route path="/" element={<Navigate to="co-pilot" />} />
        <Route path="co-pilot/*" element={<CoPilot />}></Route>
        <Route path="growth" element={<h1>Growth</h1>} />
        <Route path="user-settings" element={<UserPreferences />} />
        {/* <Route path="*" element={<Navigate to="co-pilot" />} /> */}
      </Routes>
      <Outlet />
    </div>
    // <div className="dashboard-container">
    //   <NavBarUser />
    //   {/* <nav className="dashboard-nav">
    //     <NavLink to="/dashboard/topics-definition">
    //       <Button text={'topics-definition'} type={'btn-inverted'} />
    //     </NavLink>
    //     <NavLink to="/dashboard/co-pilot">
    //       <Button text={'co-pilot'} type={'btn-inverted'} />
    //     </NavLink>
    //     <img src="/Twitter-logo-png.png" alt="twitter-logo" width="50px"></img>
    //     <button onClick={handleClick}>authorize with twitter</button>
    //   </nav> */}
    //   <div className="dashboard-content">
    //     <Outlet />
    //   </div>
    // </div>
  );
};

export default Dashboard;
