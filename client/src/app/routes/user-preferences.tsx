import { MouseEvent, SetStateAction, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api.service';
import { deactivateUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAuthUrl } from '../../services/api.service';
import ProfilePicture from '../components/profilepicture/ProfilePicture';
import { ProfilePictureProps } from '../interfaces/user.interface';
// import ProfilePicture from '../components/profilepicture/ProfilePicture';
import { CLOUDINARY_URL } from '../../services/cloudinary.service';
import '../../scss/_user-preference.scss';

const UserPreferences = (props: ProfilePictureProps) => {
  const [logo, setLogo] = useState('');
  const [imageUpload,] = useState<{ image?: any }>({});
  const [, setImg] = useState({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  const handleImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const imgSrc = URL.createObjectURL(event.target.files[0]);
      const imgAlt = event.target.files[0].name;
      setImg({ src: imgSrc, alt: imgAlt });
      setLogo(event.target.files[0]);
    }
  };

  const profileUpload = async (file: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'PinkHawkUserImage');
    formData.append('cloud_name', 'dnwteqila')
    let data = '';
    const response = await fetch(
      `${CLOUDINARY_URL}image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    console.log('file: user-preferences.tsx:51 ~~> profileUpload ~~> response', response)
    if (response.ok) {
      const responseJson = await response.json();
      data = responseJson['secure_url'];
    } else {
      console.log('Error trying to upload image')
    }
    console.log('file: user-preferences.tsx:56 ~~> profileUpload ~~> data', data)
    return data;
  };
  // TODO: fix this type
  const handleImageUpload = async (event: any) => {
    event.preventDefault();
    imageUpload.image = logo;
    await profileUpload(logo);
  };

  const handleClickNavigate = async () => {
    navigate('/dashboard/co-pilot');
  };

  const handleClick = async () => {
    const res = await getAuthUrl(user.id);
    window.location.href = res.url;
  };

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    }
    dispatch(deactivateUser());
    console.log(response);

    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  return (
    <>
      <div className='container-user-settings'>
        <h1>User Preferences</h1>
        <form className='user-setting-picture'>
          <img alt='user profile pic' src={user.profilePic} />
          <div className='user-set-profile-avatar'>
            <ProfilePicture imageUpload={handleImage} image={imageUpload.image} />
          </div>
          <div className='upload-profile-avatar'>
            <input type='submit' className='submit-button' value='Upload' onClick={(e) => handleImageUpload(e)} />
          </div>
        </form>
        <div className='current-user-settings' onClick={handleClickNavigate}>
          <div className='frequency-tweet-posting'>
            <p>Current posting daily frequency:</p>
            {user.frequencyTweetPosting}
          </div>
          <div className='selected-hours'>
            <p>Selected posting hours:</p>
            {user.postingHours.map((hour: number) => (
              <p key={hour}>{hour < 10 ? `0${hour}:00 h` : `${hour}:00 h`}</p>
            ))}
          </div>
        </div>
        <div className='connection-to-twitter'>
          <p>Connection to Twitter:</p>
          {user.twitterToken !== null ? 'Connected to Twitter' : 'Not connected to Twitter'}
          <button onClick={handleClick} className='connect-btn'>Connect to Twitter</button>
          <NavLink to=''>
            <button className='btn btn-inverted' onClick={logoutUser}>
              Logout
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserPreferences;
