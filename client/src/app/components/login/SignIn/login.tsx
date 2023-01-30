import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../../../services/api.service';
import { activeUser } from '../../../../store/slices/user.slice';
import { useAppDispatch } from '../../../hooks/hooks';
import Button from '../../button/Button';
import './login.scss';
// TESTING
// import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // set the information we are going to receive from the form
    const formData = new FormData(event.currentTarget);
    // data that we will use in the API call
    const user = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      console.log(user);

      const response = await login({
        email: formData.get('email'),
        password: formData.get('password'),
      });
      // TODO: API call to login and retrieve user from DB using email
      // we could do it this way since these are the only two fields in the sign in form
      // const response = { ok: '', json: async () => '', status: '' }; //await getUserFromAPI(user.email); // this is a mock function.
      if (!response.ok) {
        throw new Error(`Request failed with status code : ${response.status}`);
      }

      const userData = await response.json();
      if (!userData) {
        throw new Error('User not found');
      }
      // check what is the type of content we are receiving from the API call
      console.log(
        'file: SignIn.tsx:24 ~~> handleSubmit ~~> userData',
        userData
      );
      // creating the user in local storage with the information we receive from the API call
      localStorage.setItem('user', JSON.stringify({ userData }));
      // send active user to redux state. At this point, sending the user to the store might not be totally
      // necessary since we are storing the user in localStorage. To be discussed.
      dispatch(activeUser(userData));
      // using local storage as a way to keep the user logged in.
      // const userLogged = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      // if (userLogged) {
      //   navigate('/dashboard');
      // }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };
  // TODO: sign up
  return (
    <div className='login-container'>
      <div className='form-container'>
        <form className='form' onSubmit={(event) => handleSubmit(event)}>
          <h1 id='login-header'>Login</h1>
          <div className='form-input'>
            <label className='floating-label-email'>Email Address</label>
            <input
              type='text'
              name='email'
              id='email'
              className='inputEmail'
              required
            />
          </div>
          <div className='form-input'>
            <label className='floating-label-password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              className='inputPassword'
              required
            />
          </div>
          <div className='submit'>
            <Button text='Sign in' type='submit' />
          </div>
        </form>
      </div>
      <div className='graphic'></div>
    </div>
  );
};

export default Login;
