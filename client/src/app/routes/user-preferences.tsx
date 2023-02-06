import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../services/api.service';
import { activeUser, deactivateUser } from '../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getAuthUrl } from '../../services/api.service';
import ProfilePicture from '../components/profilepicture/ProfilePicture';
import { updateAvatar, uploadImage } from '../../services/cloudinary.service';
import '../../scss/_user-preference.scss';

const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const UserPreferences = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [imageUpload, setImageUpload] = useState<{ image: File }>({} as { image: File });
  const [, setImg] = useState({});
  const [rawImage, setRawImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(({ user }) => user);

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imgSrc = URL.createObjectURL(event.target.files[0]);
      const imgAlt = event.target.files[0].name;
      setImg({ src: imgSrc, alt: imgAlt });
      setLogo(event.target.files[0]);
    }
  };

  const profileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${CLOUDINARY_PRESET}`);
    formData.append('cloud_name', `${CLOUDINARY_CLOUD}`);
    let avatarLink = '';

    const response = await uploadImage(formData);

    if (response) {
      avatarLink = response['secure_url'];
      alert('Image uploaded successfully');
    } else {
      console.log('Error trying to upload image');
    };

    const userUpdatedPicture = await updateAvatar(user.id, avatarLink);

    if (userUpdatedPicture) {
      dispatch(activeUser({ ...user, profilePicture: avatarLink }));
    } else {
      console.log('Error trying to update profile picture to user');
    };
  };
  // TODO: fix this type
  const handleImageUpload = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    setImageUpload({ image: logo! });
    await profileUpload(logo!);
    setRawImage(null);
    setImageURL('');
  };

  const handleClickNavigate = async () => {
    navigate('/dashboard/co-pilot');
  };

  const handleClick = async () => {
    try {
      const res = await getAuthUrl(user.id);
      window.location.href = res.url;
    } catch (error) {
      console.log('error in handleClick in fetAuthUul', error);
    }
  };

  const logoutUser = async () => {
    const response = await logout();

    if (response.status !== 'success') {
      throw new Error('A problem occurred while logging out');
    };

    dispatch(deactivateUser());
    localStorage.removeItem('user');
    navigate('/dashboard');
  };

  return (
    <>
      <div className='container-user-settings'>
        <h1>User Preferences</h1>
        <form className='user-setting-picture'>
          <div className='user-profile-picture-circle'>
            <img
              alt='user profile pic'
              src={user.profilePicture}
              className='user-profile-picture'
            />
          </div>
          <div className='user-set-profile-avatar'>
            <ProfilePicture
              changeSubmit={() => setShowSubmit(!showSubmit)}
              setRawImage={setRawImage}
              rawImage={rawImage}
              imageURL={imageURL}
              setImageURL={setImageURL}
              imageUpload={handleImage}
              image={imageUpload.image as unknown as string}
            />
            {showSubmit &&
              <input
                type='submit'
                className={`submit-button ${showSubmit ? 'show-submit' : 'show-submit'}`}
                value='Upload'
                onClick={(event) => handleImageUpload(event)}
                hidden
              />
            }
          </div>
          {/* <div className='upload-profile-avatar'></div> */}
        </form>
        <div className='current-user-settings' onClick={handleClickNavigate}>
          <div className='frequency-tweet-posting'>
            <p>Current daily posting frequency:</p>
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
          {user.twitterToken !== null
            ? 'Connected to Twitter'
            : 'Not connected to Twitter'}
          <button onClick={handleClick} className='connect-btn'>
            Connect to Twitter
          </button>
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
