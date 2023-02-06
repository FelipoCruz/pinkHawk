import React, { useState } from 'react';
import { getUserTweets } from '../../../../services/api.service';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const RightMenuButton = () => {
  const user = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [tweets, setTweets] = useState([]);

  const formFields = {
    email: `${user.email}`,
    password: '',
  };

  const [userFileds, setUserFields] = useState(formFields);

  const fetchTweetsFromServer = async () => {
    const tweetsFromAPI = await getUserTweets(user.id, 'accepted');
    setTweets(tweetsFromAPI);
    // fetch tweets with status sent from server
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // set user.email to value
    setUserFields({ ...userFileds, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const userDetails = await updateUserDetails(user.id, user.email, user.password);
    // if (!userDetails) {
    //   throw new Error('User not found');
    // } else {  // update user in redux store and local storage
    //   // dispatch(activeUser(userDetails));
    //   // localStorage.setItem('user', JSON.stringify(userDetails));
    // }
  };

  return (
    <div>
      <button onClick={() => setMenuOpen(!isMenuOpen)}>Open Menu</button>
      {isMenuOpen && (
        <div style={{ position: 'absolute', right: 0 }}>
          <form className='sumit-new-preferences' onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor='email'>Change Email</label>
            <input
              className='email-input'
              type='email'
              onChange={handleChange}
              value={user.email}
            />
            <label htmlFor='password'>Change Password</label>
            <input
              className='password-input'
              onChange={handleChange}
              type='password'
            />
            Change Profile Picture
          </form>
          <button type='button' onClick={fetchTweetsFromServer}>
            Download Your Tweets
          </button>
        </div>
      )}
    </div>
  );
}

export default RightMenuButton;
