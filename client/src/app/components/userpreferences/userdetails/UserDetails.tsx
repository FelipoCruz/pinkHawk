import React from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserDetails } from '../../../../services/api.service';
import { useAppSelector } from '../../../hooks/hooks';

const UserDetails = () => {
  const user = useAppSelector(({ user }) => user);
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [passwordOne, setPasswordOne] = React.useState('');
  const [passwordTwo, setPasswordTwo] = React.useState('');
  const [userFileds, setUserFields] = React.useState({  password: '' });

  let password = '';
  // this function should just check if the current typed user password is correct
  const fetchUserPassword = async (password: string) => {
    // API method remains to be done
    const userPassword = await getPasswordResponse(user.id, password);
    try {
      userPassword.response === 'valid' ? password = 'valid' : password = 'invalid';
    } catch (err) {
      console.error(err);
    }
  }
  // this function should check if the first password input is the same as the second password input
  const handlePasswordChecker = async (passwordOne: string, passwordTwo: string) => {
    if (passwordOne === passwordTwo && password === 'valid') {
      await

    }
  }
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
      password: formData.get('password'),
    }
    try {
      const userDetails = await updateUserDetails(user.id, details as { password: string });
      if (!userDetails) {
        throw new Error('User not found');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form className='sumbit-new-preferences' onSubmit={(event) => handleSubmit(event)}>
        <label className='change-password-label' typeof='label' htmlFor='password'>
          Change Password
          <i className='show-password' onClick={togglePassword}>{passwordShown ? 'Hide' : 'Show'}</i>
        </label>
        <input
          className='current-password-input'
          type={passwordShown ? 'text' : 'password'}
          name='current-password'
          value={userFileds.password}
          onChange={handleChange}
        />
        <input
          className='password-input-one'
          type={passwordShown ? 'text' : 'password'}
          name='password-one'
          value={userFileds.password}
          onChange={handleChange}
        />
        <input
          className='password-input-two'
          type={passwordShown ? 'text' : 'password'}
          name='password-one'
          value={userFileds.password}
          onChange={handleChange}
        />
        <button className='submit-button-user-preferences' type='submit'>SAVE</button>
      </form>
    </div>
  );
};

export default UserDetails;
