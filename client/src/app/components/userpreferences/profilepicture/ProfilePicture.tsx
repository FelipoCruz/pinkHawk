import React, { createRef, useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { ProfilePictureProps } from '../../../interfaces/user.interface';
import './ProfilePicture.scss';

const ProfilePicture = (props: ProfilePictureProps) => {
  const user = useAppSelector(({ user }) => user);
  const [image, _setImage] = useState('');
  const [showInput, setShowInput] = useState(false);
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
    setShowInput(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImage = event.target.files[0];
      if (newImage) {
        props.setRawImage(newImage);
        setImage(URL.createObjectURL(newImage));
        props.changeSubmit();
      }
    }
    props.imageUpload(event)
  };

  useEffect(() => {
    if (!props.rawImage) return;
    props.setImageURL(URL.createObjectURL(props.rawImage));
  }, [props.rawImage]);

  return (
    <div className='profile-picture-body'>
      <button className='profile-picture-button' type='button' onClick={() => setShowInput((prevInput) => !prevInput)}>
        {user.profilePicture ? 'Change' : 'Add'} profile picture
      </button>
      {showInput &&
        <label htmlFor='files' className={`cool-upload ${showInput ? 'show-input' : ''}`}>
          {/* {showInput && */}
          <input className='profile-picture-upload'
            ref={inputFileRef}
            accept='image/*'
            type='file'
            onChange={handleFileChange}
            id='files'
            hidden
          />
          {/* } */}
          Upload File
        </label>
      }
      {props.imageURL && <img src={props.imageURL} alt='selected file' className='selected-image-modal' />}
    </div>
  );
};

export default ProfilePicture;
