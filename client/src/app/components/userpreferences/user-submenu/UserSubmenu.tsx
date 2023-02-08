import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserTweets, updateUserDetails } from '../../../../services/api.service';
import { updateAvatar, uploadImage } from '../../../../services/cloudinary.service';
import { activeUser } from '../../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import ProfilePicture from '../profilepicture/ProfilePicture';
import TweetDownload from '../tweetdownload/TweetDownload';
import './UserSubmenu.scss';

const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

// const formFields = {
//   password: '',
// };

const RightMenuButton = () => {
  const user = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const [tweets, setTweets] = useState([]);
  // const [userFileds, setUserFields] = useState(formFields);
  // const [passwordShown, setPasswordShown] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [imageUpload, setImageUpload] = useState<{ image: File }>({} as { image: File });
  const [, setImg] = useState({});
  const [rawImage, setRawImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setUserFields({ ...userFileds, [name]: value });
  // };

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const details = {
  //     password: formData.get('password'),
  //   }
  //   try {
  //     const userDetails = await updateUserDetails(user.id, details as { password: string });
  //     if (!userDetails) {
  //       throw new Error('User not found');
  //     } else {
  //       navigate('/login');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

  const handleImageUpload = async (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.preventDefault();
    setImageUpload({ image: logo! });
    await profileUpload(logo!);
    setRawImage(null);
    setImageURL('');
  };

  return (
    <div className='user-submenu'>
      <button type='button' className='user-details-button' onClick={() => setMenuOpen(!isMenuOpen)}>USER DETAILS</button>
      {isMenuOpen && (
        <div className='menu-container'>
          <div className='user-submenu-close-button'>
            <button type='button' className='close-menu' onClick={() => setMenuOpen(!isMenuOpen)}>X</button>
          </div>
          <div className='user-submenu-avatar'>
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
            </form>
          </div>
          {/* <form className='sumbit-new-preferences' onSubmit={(event) => handleSubmit(event)}>
            <label typeof='label' htmlFor='email'>Change Email</label>
            <input
              className='email-input'
              type='text'
              name='email'
              value={userFileds.email}
              onChange={handleChange}
            />
            <label className='change-password-label' typeof='label' htmlFor='password'>
              Change Password
              <i className='show-password' onClick={togglePassword}>{passwordShown ? 'Hide' : 'Show'}</i>
            </label>
            <input
              className='password-input'
              type={passwordShown ? 'text' : 'password'}
              name='password'
              value={userFileds.password}
              onChange={handleChange}
            />
            <button className='submit-button-user-preferences' type='submit'>SAVE</button>
          </form> */}
          <div className='tweet-download-button'>
            <TweetDownload />
          </div>
        </div>
      )}
    </div>
  );
}

export default RightMenuButton;
