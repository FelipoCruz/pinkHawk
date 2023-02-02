import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './components/login/SignIn/login';
import SignUp from './components/login/SignUp/sign-up';
import CoPilot from './routes/co-pilot';
import Dashboard from './routes/dashboard';
import HomePage from './routes/home-page';
import ProtectedRoute from './routes/protected-route';
import TopicsDefinition from './routes/topics-definition';
import UserPreferences from './routes/user-preferences';

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
          >
            <Route
              path="topics-definition"
              element={
                <ProtectedRoute>
                  <TopicsDefinition />
                </ProtectedRoute>
              }
            />
            <Route
              path="co-pilot"
              element={
                <ProtectedRoute>
                  <CoPilot />
                </ProtectedRoute>
              }
            />
            <Route
              path="growth"
              element={
                <ProtectedRoute>
                  <h1>Growth</h1>
                </ProtectedRoute>
              }
            />
            <Route
              path="user/preferences"
              element={
                <ProtectedRoute>
                  <UserPreferences />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard/co-pilot" />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
