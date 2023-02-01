import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../../../services/api.service';
import { activeUser } from '../../../../store/slices/user.slice';
import { useAppDispatch } from '../../../hooks/hooks';
import IUser from '../../../interfaces/user.interface';
import Button from '../../button/Button';
import './login.scss';
// TESTING
// import { useSelector, type TypedUseSelectorHook, useDispatch } from 'react-redux';
const defaultFormFields = {
  email: '',
  password: '',
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData: IUser = await login(email, password);
      if (!userData) {
        throw new Error('User not found');
      }
      dispatch(activeUser(userData));

      // creating the user in local storage with the information we receive from the API call
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  // TODO: sign up
  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <h1 className="login-header">Login</h1>
          <div className="form-input">
            <label className="floating-label-email">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div className="form-input">
            <label className="floating-label-password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className="submit">
            <Button text="Sign in" type="submit" />
          </div>
        </form>
      </div>
      <div className="graphic"></div>
    </div>
  );
};

export default Login;
