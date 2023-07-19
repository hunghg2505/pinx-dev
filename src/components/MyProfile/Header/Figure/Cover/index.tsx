import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';

import UpLoadCover from './UpLoadCover';

const Cover = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <>
      {profileUser?.coverImage && (
        <>
          <img
            src={profileUser?.coverImage}
            alt='background cover'
            className='absolute left-0 top-0 h-full w-full object-cover tablet:rounded-[8px]'
          />
          <UpLoadCover />
        </>
      )}
    </>
  );
};
export default Cover;
