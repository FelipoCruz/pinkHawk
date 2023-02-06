import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import NavBarUser from '../components/navbar/loginnavbar/LoginNavBar';
import { getUserById } from '../../services/api.service';
import { useEffect } from 'react';
import IUser from '../interfaces/user.interface';
import { activeUser } from '../../store/slices/user.slice';
import CoPilot from './co-pilot';
import UserPreferences from './user-preferences';

const Dashboard = () => {
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

    // if (!isLoggedIn) {
    //   (async () => {
    //     let storedString = localStorage.getItem('user');
    //     if (storedString) {
    //       const storedUser: IUser = JSON.parse(storedString);
    //       console.log('storedUser', storedUser);

    //       if (storedUser) {
    //         const user: IUser = await getUserById(storedUser.id);
    //         console.log(user);

    //         dispatch(activeUser(user));
    //       }
    //     }
    //   })();
    // }
  }, []);

  return (
    <div className="dashboard">
      <NavBarUser />
      <Routes>
        <Route path="/" element={<Navigate to="co-pilot" />} />
        <Route path="co-pilot/*" element={<CoPilot />}></Route>
        <Route path="growth" element={<h1>Growth</h1>} />
        <Route path="user-preferences" element={<UserPreferences />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Dashboard;
