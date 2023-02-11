import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../../../services/api.service';
import { useAppSelector } from '../../../hooks/hooks';
import './UserDetails.scss'

const UserDetails = () => {
  const user = useAppSelector(({ user }) => user);
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [userFileds, setUserFields] = React.useState({
    currentPassword: '',
    passwordOne: '',
    passwordTwo: ''
  });

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFields({ ...userFileds, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const details = {
      currentPassword: formData.get('current-password'),
      passwordOne: formData.get('password-one'),
      passwordTwo: formData.get('password-two'),
    }
    if (details.passwordOne === details.passwordTwo) {
      try {
        const userDetails = await updateUserDetails(user.id, details as {
          currentPassword: string,
          passwordOne: string,
          passwordTwo: string
        });
        if (!userDetails) {
          throw new Error('User not found');
        } else {
          alert('Password changed successfully, you are being redirected to the login page');
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Passwords do not match');
    };
  };

  return (
    <div className='change-user-password-form'>
      <form
        className='sumbit-new-preferences'
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className='password-and-label'>
          <label
            className='change-password-label'
            typeof='label'
            htmlFor='password'
          >
            Change Password
          </label>
          <i className='show-password' onClick={togglePassword}>
            {passwordShown ? 'Hide' : 'Show'}
          </i>
        </div>
        <label className='current-password-label' htmlFor='current-password'>
          Current Password
        </label>
        <input
          className='current-password-input'
          type={passwordShown ? 'text' : 'password'}
          name='current-password'
          id='current-password'
          onChange={handleChange}
        />
        <label className='new-password-label' htmlFor='password-one'>
          New Password
        </label>
        <input
          className='password-input-one'
          type={passwordShown ? 'text' : 'password'}
          name='password-one'
          id='password-one'
          onChange={handleChange}
        />
        <label className='confirm-password-label' htmlFor='password-two'>
          Confirm Password
        </label>
        <input
          className='password-input-two'
          type={passwordShown ? 'text' : 'password'}
          name='password-two'
          id='password-two'
          onChange={handleChange}
        />
        <button className='submit-button-user-preferences' type='submit'>
          SAVE
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
