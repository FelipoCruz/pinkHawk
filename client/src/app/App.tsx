import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/SignIn/login';
import SignUp from './components/login/SignUp/sign-up';
import Dashboard from './routes/dashboard/dashboard';
import HomePage from './routes/home-page';
import ProtectedRoute from './routes/protected-route';
import './App.scss';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
