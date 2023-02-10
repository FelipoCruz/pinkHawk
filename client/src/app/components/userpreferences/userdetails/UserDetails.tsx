import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../../../services/api.service';
import { useAppSelector } from '../../../hooks/hooks';
import './UserDetails.scss'

const UserDetails = () => {
  const user = useAppSelector(({ user }) => user);
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = React.useState(false);
  // const [passwordOne, setPasswordOne] = React.useState('');
  // const [passwordTwo, setPasswordTwo] = React.useState('');
  const [userFileds, setUserFields] = React.useState({
    currentPassword: '',
    passwordOne: '',
    passwordTwo: ''
  });

  // this function should check if the first password input is the same as the second password input
  // const handlePasswordChecker = async (passwordOne: string, passwordTwo: string) => {
  //   if (passwordOne === passwordTwo && password === 'valid') {
  //     await
  //   }
  // }

  // fuction to toggle password visibility
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
          // value={userFileds.currentPassword}
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
          // value={userFileds.passwordOne}
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
          // value={userFileds.passwordTwo}
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
