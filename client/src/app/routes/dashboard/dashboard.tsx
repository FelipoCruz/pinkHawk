import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { getUserById } from '../../../services/api.service';
import { activeUser } from '../../../store/slices/user.slice';
import GrowthMenu from '../../components/growthmenu/GrowthMenu';
import NavBarUser from '../../components/loginnavbar/LoginNavBar';
import Sidebar from '../../components/sidebar/sidebar';
import UserPreferences from '../../components/userpreferences/UserPreferences';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import IUser from '../../interfaces/user.interface';
import CoPilot from '../co-pilot';
import TopicsDefinition from '../topics-definition';
import './dashboard.scss';

const Dashboard = () => {
  const [navbarState] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refresh = async () => {
      console.log('isLoggedIn in App', isLoggedIn);
      if (!isLoggedIn) {
        let storedString = localStorage.getItem('user');
        if (storedString) {
          const storedUser: IUser = JSON.parse(storedString);
          console.log('storedUser', storedUser);

          if (storedUser) {
            const user: IUser = await getUserById(storedUser.id);
            console.log(user);

            dispatch(activeUser(user));
            console.log('isLoggedIn after refresh', isLoggedIn);
          }
        }
      }
    };
    refresh();
  }, []);

  return (
    <div className="dashboard">
      <NavBarUser />
      <Sidebar navbarState={navbarState} />
      <main id="main">
        <Routes>
          <Route path="/" element={<Navigate to="co-pilot" />} />
          <Route path="co-pilot/*" element={<CoPilot />} />
          <Route path="growth" element={<GrowthMenu />} />
          <Route path="user-preferences" element={<TopicsDefinition />} />
          <Route path="user-settings" element={<UserPreferences />} />
          {/* <Route path="*" element={<Navigate to="co-pilot" />} /> */}
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
