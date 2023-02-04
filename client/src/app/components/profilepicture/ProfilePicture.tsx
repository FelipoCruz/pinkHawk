import React, { createRef, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
// export interface ProfilePictureProps {
//   image: string;
//   imageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

const ProfilePicture = (props: any) => {
  const user = useAppSelector((state) => state.user);
  const [image, _setImage] = useState('');
  const inputFileRef = createRef<any>();

  const cleanup = () => {
    URL.revokeObjectURL(image && props.image);
    if (inputFileRef.current) {

      inputFileRef.current.value = null;
    }
  };

  const setImage = (newImage: any) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleFileChange = (event: any) => {
    // if (event.target.files) {
      const newImage = event.target.files[0];
      if (newImage) {
        setImage(URL.createObjectURL(newImage));
      }
    // }
    props.imageUpload(event)
  };

  return (
    <div className='profile-picture-body'>
      <input
        className='profile-picture-image'
        alt={user.name}
        src={image || props.image}
      />
      <input
        ref={inputFileRef}
        accept='image/*'
        type='file'
        onChange={handleFileChange}
        // hidden
        id='avatar-image-upload'
      />
      <label htmlFor='avatar-image-upload' className='profile-picture-label'>
        <button>
          {image ? <button>Delete</button> : <button>Upload</button>}
          {image ? 'Change' : 'Upload'} profile picture
        </button>
      </label>
    </div>
  );
};

export default ProfilePicture;
