import React, { createRef, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { ProfilePictureProps } from '../../interfaces/user.interface';

const ProfilePicture = (props: ProfilePictureProps) => {
  const user = useAppSelector((state) => state.user);
  const [image, _setImage] = useState('');
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
      <input
        className='profile-picture-image'
        alt={user.name}
        src={image || props.image}
      />
      <input className='profile-picture-input'
        ref={inputFileRef}
        accept='image/*'
        type='file'
        onChange={handleFileChange}
        // hidden
        id='avatar-image-upload'
      />
      {/* <label htmlFor='avatar-image-upload' className='profile-picture-label'> */}
      <button className='profile-picture-button'>
        {/* {image ? <button>Delete</button> : <button>Upload</button>} */}
        {image ? 'Change' : 'Upload'} profile picture
      </button>
      {/* </label> */}
    </div>
  );
};

export default ProfilePicture;
