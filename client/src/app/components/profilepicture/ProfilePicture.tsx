import React, { createRef, useState } from 'react';

interface ProfilePictureProps {
  image: string;
  imageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePicture = (props: ProfilePictureProps) => {
  const [image, _setImage] = useState('');
  const inputFileRef = createRef<HTMLInputElement>();

  const cleanup = () => {
    URL.revokeObjectURL(image && props.image);
    if (inputFileRef.current) {
      // @ts-ignore
      inputFileRef.current.value = null;
    }
  };

  const setImage = (newImage: any) => {
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
    <div className='profile-picture'>
      <img
        className='profile-picture__image'
        alt='user profile avatar'
        src={image || props.image}
      />
      <input
        ref={inputFileRef}
        accept='image/*'
        type='file'
        onChange={handleFileChange}
        hidden
        id='avatar-image-upload'
      />
      <label htmlFor='avatar-image-upload' className='profile-picture-label'>
        <button>
          {image ? 'Change' : 'Upload'}
        </button>
      </label>
    </div>
  );
};

export default ProfilePicture;
