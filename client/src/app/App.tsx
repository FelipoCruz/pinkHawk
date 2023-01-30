import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserById } from '../services/api.service';
import { activeUser } from '../store/slices/user.slice';
import './App.scss';
import Header from './components/header/Header';
import Login from './components/login/SignIn/login';
import SignUp from './components/login/SignUp/sign-up';
<<<<<<< HEAD
import { useAppSelector } from './hooks/hooks';
import CoPilot from './routes/co-pilot';
=======
import { useAppDispatch, useAppSelector } from './hooks/hooks';
>>>>>>> 9f36b5a71c85d1d87734372d9543b2b2bc0032af
import Dashboard from './routes/dashboard';
import HomePage from './routes/home-page';
import ProtectedRoute from './routes/protected-route';
import TopicsDefinition from './routes/topics-definition';

const App: React.FC = (): JSX.Element => {
  const loggeIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggeIn) {
      (async () => {
        let storedString = localStorage.getItem('user');
        if (storedString) {
          const storedUser = JSON.parse(storedString);

          if (storedUser) {
            const user = await getUserById(storedUser.id);
            console.log(user);

            dispatch(activeUser(user));
          }
        }
      })();
    }
  }, []);

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topics-definition"
            element={
              <ProtectedRoute>
                <TopicsDefinition />
              </ProtectedRoute>

            }
          />
          <Route
            path="/co-pilot"
            element={
              <ProtectedRoute>
                <CoPilot />
              </ProtectedRoute>

            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
