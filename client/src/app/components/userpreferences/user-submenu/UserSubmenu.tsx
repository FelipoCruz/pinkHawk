import React, { useState } from 'react';
import { updateAvatar, uploadImage } from '../../../../services/cloudinary.service';
import { activeUser } from '../../../../store/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import ProfilePicture from '../profilepicture/ProfilePicture';
import TweetDownload from '../tweetdownload/TweetDownload';
import defaultImg from '../../../../images/tom.jpg';
import './UserSubmenu.scss';

const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

const RightMenuButton = () => {
  const user = useAppSelector(({ user }) => user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [imageUpload, setImageUpload] = useState<{ image: File }>({} as { image: File });
  const [, setImg] = useState({});
  const [rawImage, setRawImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

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
      <button type='button' className='user-details-button' onClick={() => setMenuOpen(!isMenuOpen)}>PROFILE PICTURE</button>
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
                  src={!user.profilePicture ? defaultImg : user.profilePicture}
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
          <button className='tweet-download-button'>
            <TweetDownload />
          </button>
        </div>
      )}
    </div>
  );
}

export default RightMenuButton;
