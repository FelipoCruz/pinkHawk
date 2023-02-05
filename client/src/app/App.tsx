import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/SignIn/login';
import SignUp from './components/login/SignUp/sign-up';
import Dashboard from './routes/dashboard/dashboard';
import HomePage from './routes/home-page';
import ProtectedRoute from './routes/protected-route';

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
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
    // <>
    //   <div className='container'>
    //     <Routes>
    //       <Route path='/' element={<HomePage />} />
    //       <Route
    //         path='/dashboard/*'
    //         element={
    //           <ProtectedRoute>
    //             <Dashboard />
    //           </ProtectedRoute>
    //         }
    //       >
    //         <Route
    //           path='topics-definition'
    //           element={
    //             <ProtectedRoute>
    //               <TopicsDefinition />
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path='co-pilot'
    //           element={
    //             <ProtectedRoute>
    //               <CoPilot />
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path='growth'
    //           element={
    //             <ProtectedRoute>
    //               <h1>Growth</h1>
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route
    //           path='user/preferences'
    //           element={
    //             <ProtectedRoute>
    //               <UserPreferences image={''} imageUpload={function (event: React.ChangeEvent<HTMLInputElement>): void {
    //                 throw new Error('Function not implemented.');
    //               } } />
    //             </ProtectedRoute>
    //           }
    //         />
    //         <Route path='*' element={<Navigate to='/dashboard/co-pilot' />} />
    //       </Route>
    //       <Route path='/login' element={<Login />} />
    //       <Route path='/signup' element={<SignUp />} />
    //     </Routes>
    //   </div>
    // </>
  );
};

export default App;
