import React, { createRef, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { ProfilePictureProps } from '../../interfaces/user.interface';
import './ProfilePicture.scss';

const ProfilePicture = (props: ProfilePictureProps) => {
  const user = useAppSelector(({ user }) => user);
  const [image, _setImage] = useState('');
  const [showInput, setShowInput] = useState(false);
  // TODO: check for the correct type
  const inputFileRef = createRef<any>();

  const cleanup = () => {
    URL.revokeObjectURL(image && props.image);
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };

  const setImage = (newImage: React.SetStateAction<string>) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImage = event.target.files[0];
      if (newImage) {
        setImage(URL.createObjectURL(newImage));
      }
    }
    props.imageUpload(event)
  };

  return (
    <div className='profile-picture-body'>
      {/* <input
        className='profile-picture-image'
        alt={user.name}
        src={image || props.image}
      /> */}
      <button className='profile-picture-buttons' onClick={() => setShowInput(!showInput)}>
        {image ? 'Change' : 'Add'} profile picture
      </button>
      <input className={`profile-picture-upload ${showInput ? 'show-input' : ''}`}
        ref={inputFileRef}
        accept='image/*'
        type='file'
        onChange={handleFileChange}
        // hidden
      />
    </div>
  );
};

export default ProfilePicture;
